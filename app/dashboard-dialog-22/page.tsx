import { Button } from '@/components/ui/button'

import ErrorDialog from '@/components/shadcn-studio/blocks/dashboard-dialog-22/dialog-error'

const DialogPage = () => {
  return (
    <div className='flex h-dvh items-start justify-center p-8'>
      <ErrorDialog
        defaultOpen
        trigger={
          <Button variant='outline'>
            <span>Delete</span>
          </Button>
        }
      />
    </div>
  )
}

export default DialogPage
