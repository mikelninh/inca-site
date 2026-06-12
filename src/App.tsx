import Hero from './components/Hero'
import Nav from './components/Nav'
import Console from './components/console/Console'
import Grounding from './components/Grounding'
import Teardown from './components/Teardown'

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Console />
      <Teardown />
      <Grounding />
      <section id="flotte" />
      <section id="fit" />
      <section id="cta" />
    </>
  )
}
