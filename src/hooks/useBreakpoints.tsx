import { useEffect, useRef, useState } from "react"

type screenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export default function useBreakpoints() {
  const width = useRef(1200)
  const [size, setSize] = useState<string|null>(null)
  
  const sizes = {
    xl: 1200,
    lg: 992,
    md: 768,
    sm: 576,
    xs: 0
  }

  const handleResize = () => {
    width.current = window.innerWidth
    for(const sz in sizes) {
      if(window.innerWidth > sizes[sz as keyof typeof sizes]) {
        setSize(sz)
        return;
      }
    }
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])


  return {
    size,
    screenIs: (size:screenSize) => width.current >= sizes[size]
  }
}
