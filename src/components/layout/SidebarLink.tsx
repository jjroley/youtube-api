'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ComponentType, SVGProps } from "react"



type SidebarButtonProps = {
  fillIcon: ComponentType<SVGProps<SVGSVGElement>>
  outlineIcon: ComponentType<SVGProps<SVGSVGElement>>
  text: string
  href: string
  small?: boolean
}

export default function SidebarButton({ fillIcon, outlineIcon, text, href, small = false }:SidebarButtonProps) {
  const path = usePathname()

  console.log(path)

  const isActive = path === href;

  const Icon = isActive ? fillIcon : outlineIcon

  const classes = (
    small ?
    'p-4 flex flex-col gap-1 text-xs items-center hover:bg-slate-100 rounded-lg cursor-pointer' :
    'rounded-[10px] cursor-pointer hover:bg-slate-100 px-4 py-2 flex items-center mr-2 gap-6 text-sm'
  )

  return (
    <Link href={href} className={`${isActive && 'bg-slate-100'} ${classes}`}>
      <Icon style={{ width: '24px' }} />
      <span>{text}</span>
    </Link>
  )
}