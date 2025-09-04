interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="text-center py-5">
      <h1 className="text-2xl font-bold">{title}</h1>
      {subtitle && <p className="text-gray-600">{subtitle}</p>}
      <button className="absolute right-5 top-1/2 transform -translate-y-1/2">
        🔍
      </button>
    </header>
  )
}
