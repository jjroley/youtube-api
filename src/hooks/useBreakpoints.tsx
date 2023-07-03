import { useEffect, useState } from "react"

type screenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export default function useBreakpoints() {
  const [size, setSize] = useState<string|null>(null)
  
  const sizes = {
    xl: 1200,
    lg: 992,
    md: 768,
    sm: 576,
    xs: 0
  }

  const handleResize = () => {
    for(const sz in sizes) {
      if(window.innerWidth > sizes[sz as keyof typeof sizes]) {
        setSize(sz)
        return;
      }
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])


  return {
    size,
    screenIs: (size:screenSize) => typeof window === 'undefined' ? true : window.innerWidth > sizes[size]
  }
}
