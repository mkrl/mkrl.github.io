export const createEasterEgg = (terminal) => {
  const consoleStyle = 'background-color: black; color: white; font-style: monospace; font-size: 1.5em;'
  let easterEggFound = false

  terminal.enqueue = (command) => {
    if (!easterEggFound) {
      console.log('%cImpressive! Now try changing the prompt to something ridiculous with "terminal.setPrompt("🤖: ")"', consoleStyle);
    }
    terminal.print(command, true)
    terminal.run(command)
    easterEggFound = true
  }
  window.terminal = terminal

  console.log("%cWow, you have accessed console in a console website! How deep does that go?", consoleStyle);
  console.log('%cYou can directly communicate with the terminal here by using "terminal.enqueue("command")"', consoleStyle);
}