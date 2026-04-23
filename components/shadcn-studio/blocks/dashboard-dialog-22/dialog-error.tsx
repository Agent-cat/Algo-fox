'use client'

import { useState, type ReactNode } from 'react'

import { TriangleAlertIcon } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

import { cn } from '@/lib/utils'

type Props = {
  trigger: ReactNode
  defaultOpen?: boolean
  className?: string
}

const ErrorDialog = ({ defaultOpen = false, trigger, className }: Props) => {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <Dialog open={open} onOpenChangeAction={setOpen}>
      <DialogTrigger asChild onClickAction={() => setOpen(true)}>
        {trigger}
      </DialogTrigger>
      <DialogContent className={cn('sm:max-w-145 [&>[data-slot=dialog-close]>svg]:size-5', className)}>
        <DialogHeader className='items-center gap-4'>
          <Avatar className='border-destructive bg-destructive/10 dark:border-destructive/10 dark:bg-destructive/10 size-15 border p-2'>
            <AvatarFallback className='bg-transparent'>
              <div className='flex items-center justify-center'>
                <TriangleAlertIcon className='text-destructive dark:text-destructive size-7' />
              </div>
            </AvatarFallback>
          </Avatar>
          <div className='space-y-3.5 text-center'>
            <DialogTitle className='leading-7'>Are you absolutely sure you want to delete?</DialogTitle>
            <DialogDescription className='max-w-sm'>
              This action cannot be undone. This will permanently delete your account and remove your data from our
              servers.
              <span className='mt-4 flex items-center justify-center gap-3'>
                <Checkbox id='terms' />
                <Label htmlFor='terms'>Don&apos;t ask again</Label>
              </span>
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className='flex-row items-center justify-center! gap-4'>
          <DialogClose asChild>
            <Button size='lg' variant='outline'>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button size='lg' variant='destructive'>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ErrorDialog
