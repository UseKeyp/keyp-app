import MobileNav from './MobileNav'

export const generated = () => {
  return (
    <div
      // Simulating a mobile device
      style={{
        maxWidth: 400,
        height: 800,
        overflowY: 'scroll',
        border: '1px solid #fff',
        borderRadius: 10,
        position: 'relative',
      }}
    >
      <MobileNav />
      <div style={{ paddingTop: 100 }}>
        <div>blah blah blah home content</div>
        <div>blah blah blah home content</div>
        <div>blah blah blah home content</div>
        <div>blah blah blah home content</div>
        <div>blah blah blah home content</div>
        <div>blah blah blah home content</div>
        <div>blah blah blah home content</div>
      </div>
    </div>
  )
}

export default { title: 'Components/MobileNav' }
