import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

type props = {
   children: React.ReactNode, 
   src: string
}

async function NewListing({children, src}: props) {
  return (
    <Dialog>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent className='w-full max-w-[90vw]'>
            <picture>
                <img src={src} alt="Selected image" className='flex w-full object-cover' />
            </picture>
        </DialogContent>
    </Dialog>
  )
}

export default NewListing