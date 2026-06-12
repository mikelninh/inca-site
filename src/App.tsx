import CtaFooter from './components/CtaFooter'
import Fit from './components/Fit'
import Fleet from './components/Fleet'
import Grounding from './components/Grounding'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Teardown from './components/Teardown'
import Console from './components/console/Console'

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Console />
      <Teardown />
      <Grounding />
      <Fleet />
      <Fit />
      <CtaFooter />
    </>
  )
}
