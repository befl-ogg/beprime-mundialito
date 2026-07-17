export default function SectionTitle({ children, action }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <h2 className="display text-xl text-bone">
        <span className="mr-2 inline-block h-4 w-1.5 translate-y-[1px] bg-ember" aria-hidden />
        {children}
      </h2>
      {action}
    </div>
  )
}
