export default function DHeader({ children, style={} }) {
  return <div className="header" style={style}>
    {children}
  </div>
}