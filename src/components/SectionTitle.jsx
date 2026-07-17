export default function SectionTitle({ children, action }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <h2 className="display flex items-center gap-2.5 text-2xl italic text-bone">
        <span className="inline-block h-6 w-1 bg-ember" aria-hidden />
        {children}
      </h2>
      {action}
    </div>
  )
}
