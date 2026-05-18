/** Matches Figma header frame height (node 3429:19804). */
export const APP_HEADER_HEIGHT_PX = 67

const HELIOS_LOGO_SRC = `${import.meta.env.BASE_URL}helios-logo.png`

export function AppHeader() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 flex h-[67px] shrink-0 items-center bg-neutral-topmost px-6 shadow-[0_5px_5px_rgba(0,0,0,0.15)]"
      aria-label="Application header"
    >
      <img
        src={HELIOS_LOGO_SRC}
        alt="Helios"
        width={190}
        height={44}
        className="h-[22px] w-auto brightness-0"
        decoding="async"
        draggable={false}
      />
    </header>
  )
}
