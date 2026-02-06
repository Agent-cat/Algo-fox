module.exports = [
"[project]/lib/sql-converter.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "convertBatchToSQLite",
    ()=>convertBatchToSQLite,
    "convertToSQLite",
    ()=>convertToSQLite
]);
function convertToSQLite(sql) {
    if (!sql || !sql.trim()) {
        return sql;
    }
    let converted = sql;
    // 1. Convert AUTO_INCREMENT to AUTOINCREMENT (SQLite syntax - one word, no underscore)
    // This must be done first before other conversions
    converted = converted.replace(/\bAUTO_INCREMENT\b/gi, 'AUTOINCREMENT');
    // 2. Convert INT PRIMARY KEY AUTOINCREMENT to INTEGER PRIMARY KEY AUTOINCREMENT
    // SQLite requires INTEGER (not INT) for PRIMARY KEY with AUTOINCREMENT
    converted = converted.replace(/\bINT\s+PRIMARY\s+KEY\s+AUTOINCREMENT\b/gi, 'INTEGER PRIMARY KEY AUTOINCREMENT');
    converted = converted.replace(/\bINT\s+AUTOINCREMENT\s+PRIMARY\s+KEY\b/gi, 'INTEGER PRIMARY KEY AUTOINCREMENT');
    // 3. Convert INT PRIMARY KEY to INTEGER PRIMARY KEY (SQLite requires INTEGER for PRIMARY KEY)
    // This handles cases without AUTOINCREMENT
    converted = converted.replace(/\bINT\s+PRIMARY\s+KEY\b/gi, 'INTEGER PRIMARY KEY');
    // 4. Convert INT AUTOINCREMENT to INTEGER AUTOINCREMENT (for non-PRIMARY KEY cases)
    converted = converted.replace(/\bINT\s+AUTOINCREMENT\b/gi, 'INTEGER AUTOINCREMENT');
    // 5. Convert MySQL backticks to SQLite double quotes (optional, SQLite accepts both)
    // But we'll keep backticks as SQLite 3.3+ supports them
    // 6. Convert MySQL/PostgreSQL LIMIT syntax if needed
    // SQLite supports: LIMIT n OFFSET m (same as MySQL)
    // No conversion needed for LIMIT/OFFSET
    // 7. Convert string concatenation
    // MySQL: CONCAT(a, b) -> SQLite: a || b
    // Handle nested CONCAT calls
    converted = convertConcatToConcatOperator(converted);
    // 8. Convert boolean handling
    // MySQL: TRUE/FALSE -> SQLite: 1/0 (SQLite doesn't have native boolean)
    converted = converted.replace(/\bTRUE\b/gi, '1');
    converted = converted.replace(/\bFALSE\b/gi, '0');
    // 9. Convert date functions (common differences)
    // MySQL: NOW() -> SQLite: datetime('now')
    converted = converted.replace(/\bNOW\(\)\b/gi, "datetime('now')");
    // MySQL: CURDATE() -> SQLite: date('now')
    converted = converted.replace(/\bCURDATE\(\)\b/gi, "date('now')");
    // MySQL: CURTIME() -> SQLite: time('now')
    converted = converted.replace(/\bCURTIME\(\)\b/gi, "time('now')");
    // 10. Convert IFNULL to COALESCE (SQLite supports both, but COALESCE is standard)
    // Actually, SQLite supports IFNULL, so no conversion needed
    // 11. Remove MySQL-specific ENGINE and CHARSET clauses
    converted = converted.replace(/\s+ENGINE\s*=\s*\w+/gi, '');
    converted = converted.replace(/\s+CHARSET\s*=\s*\w+/gi, '');
    converted = converted.replace(/\s+COLLATE\s*=\s*\w+/gi, '');
    // 12. Convert MySQL-specific data types
    // TINYINT -> INTEGER
    converted = converted.replace(/\bTINYINT\b/gi, 'INTEGER');
    // MEDIUMINT -> INTEGER
    converted = converted.replace(/\bMEDIUMINT\b/gi, 'INTEGER');
    // BIGINT -> INTEGER (SQLite stores all integers as INTEGER)
    // Actually, keep BIGINT as SQLite handles it
    // VARCHAR(n) -> TEXT (SQLite doesn't enforce length)
    // Keep VARCHAR as SQLite accepts it
    // TEXT -> TEXT (same)
    // DATETIME -> TEXT (SQLite stores dates as TEXT)
    // Keep DATETIME as SQLite accepts it
    // 13. Remove MySQL-specific UNSIGNED keyword
    converted = converted.replace(/\bUNSIGNED\b/gi, '');
    // 14. Convert MySQL-specific ON DUPLICATE KEY UPDATE to SQLite INSERT OR REPLACE
    // This is complex, so we'll handle it separately if needed
    // For now, keep as is and let SQLite handle errors
    // 15. Clean up extra whitespace and semicolons
    converted = converted.trim();
    return converted;
}
/**
 * Converts CONCAT() function calls to SQLite's || concatenation operator
 * Handles nested CONCAT calls efficiently with iterative approach
 */ function convertConcatToConcatOperator(sql) {
    // Early return if no CONCAT found
    if (!/\bCONCAT\s*\(/i.test(sql)) {
        return sql;
    }
    let result = sql;
    let changed = true;
    let iterations = 0;
    const maxIterations = 20; // Prevent infinite loops
    // Process CONCAT calls iteratively (handles nesting)
    while(changed && iterations < maxIterations){
        iterations++;
        changed = false;
        // Find innermost CONCAT call (no nested CONCAT inside)
        const concatMatch = result.match(/\bCONCAT\s*\(([^()]+)\)/i);
        if (concatMatch) {
            changed = true;
            const args = concatMatch[1];
            const argsList = splitConcatArgs(args);
            // Join with || operator
            const converted = argsList.map((arg)=>arg.trim()).join(' || ');
            // Replace the CONCAT call
            result = result.replace(concatMatch[0], `(${converted})`);
        }
    }
    return result;
}
/**
 * Splits CONCAT arguments while respecting nested parentheses
 */ function splitConcatArgs(args) {
    const result = [];
    let current = '';
    let depth = 0;
    for(let i = 0; i < args.length; i++){
        const char = args[i];
        if (char === '(') {
            depth++;
            current += char;
        } else if (char === ')') {
            depth--;
            current += char;
        } else if (char === ',' && depth === 0) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    if (current.trim()) {
        result.push(current.trim());
    }
    return result;
}
function convertBatchToSQLite(sql) {
    // Split by semicolon but keep them for SQLite
    const statements = sql.split(';').filter((s)=>s.trim());
    if (statements.length === 0) {
        return sql;
    }
    // Convert each statement
    const converted = statements.map((stmt)=>convertToSQLite(stmt.trim()));
    // Join with semicolons
    return converted.join(';\n') + (sql.trim().endsWith(';') ? ';' : '');
}
}),
];

//# sourceMappingURL=lib_sql-converter_ts_2714d7bc._.js.map