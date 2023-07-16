import { cn } from '@/lib/util'
import { cva,VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { ButtonHTMLAttributes } from 'react'

const buttonVariants = cva(
    'active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-color focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
    {
        variants: {
            varaient: {
                default: "text-white bg-slate-900 hover:bg-slate-800",
                ghost: "bg-trasparent hover:text-slate-900 hover:bg-slate-200",
            },
            size:{
                default: "h-10 py-2 px-4",
                sm: "h-9 px-2",
                lg: "h-11 px-8",
            },
        },
        defaultVariants:{ varaient:"default",size:"default"},
    } 
)

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    isloading?: boolean
}


const Button = ({
    isloading,
    className,
    children,
    varaient,
    size,
    ...props
}:ButtonProps) => {
  return <button
    className={cn(buttonVariants({ varaient, size, className }))}
    disabled={isloading}
    {...props}
      >
    {isloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin "/> : null}
    <div>{children}</div>
  </button>
}

export default Button

