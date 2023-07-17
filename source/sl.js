/*========================================
 * Original steam locomotive credit goes to:
 *    sl.h: SL version 5.02
 *       Toyoda Masashi
 *		  (mtoyoda@acm.org)
 * https://github.com/mtoyoda/sl/blob/master/sl.h
 *========================================
 */

const STEAM_START_POSITION = 6

const steam = [
  [
  "               (  ) (@@) ( )  (@)  ()    @@    O     @     O     @      ",
  "          (@@@)",
  "      (    )",
  "",
  "   (@@@@)",
  "",
  "(    )",
  ],
  [
  "               (@@) (  ) (@)  ( ) @()     @ @   O      @     O     @    ",
  "          (   )",
  "      (    )",
  "     @@@@",
  "   (   )",
  "",
  "(@@@@)",
  ],
  [
  "               ( @)@ (  ) ( ) @( )  ()@        @ @   O      @     O    @",
  "          (   )",
  "      (@@@@)",
  "     ",
  "   (   )",
  "   @@@@",
  "(    )",
  ],

// Moving the steam away to match the chimney position
].map(frame => (
  frame.map(row => `${' '.repeat(STEAM_START_POSITION)}${row}`)
))

const body = [
"      ====        ________                ___________ ",
"  _D _|  |_______/        \\__I_I_____===__|_________| ",
"   |(_)---  |   H\\________/ |   |        =|___ ___|   ",
"   /     |  |   H  |  |     |   |         ||_| |_||   ",
"  |      |  |   H  |__--------------------| [___] |   ",
"  | ________|___H__/__|_____/[][]~\\_______|       |   ",
"  |/ |   |-----------I_____I [][] []  D   |=======|__ ",
  ]

const wheels = [
  [
    "__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|_| ",
    " |/-=|___|=    ||    ||    ||    |_____/~\\___/        ",
    "  \\_/      \\_O=====O=====O=====O/      \\_/            ",
  ],
  [
    "__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|_| ",
    " |/-=|___|=   O=====O=====O=====O|_____/~\\___/        ",
    "  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/            ",
  ],
  [
    "__/ =| o |=-~O=====O=====O=====O\\ ____Y___________|_| ",
    " |/-=|___|=    ||    ||    ||    |_____/~\\___/        ",
    "  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/            ",
  ],
  [
    "__/ =| o |=-O=====O=====O=====O \\ ____Y___________|_| ",
    " |/-=|___|=    ||    ||    ||    |_____/~\\___/        ",
    "  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/            ",
  ],
  [
    "__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|_| ",
    " |/-=|___|=O=====O=====O=====O   |_____/~\\___/        ",
    "  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/            ",
  ],
  [
  "__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|_| ",
  " |/-=|___|=    ||    ||    ||    |_____/~\\___/        ",
  "  \\_/      \\O=====O=====O=====O_/      \\_/            ",
  ],
]

let lastTimestamp = null
let renderOrder = true
let frames = []

// Can draw only 2 arrays at a time depending on the flag? Good enough
const drawArray = (container, frame, array, renderOrderPosition) => {
  const assembly = document.createElement('div')
  assembly.textContent = array[frame].join('\n')
  container.innerHTML = ''
  container.appendChild(assembly)

  const animate = (timestamp) => {
    if (!lastTimestamp || timestamp - lastTimestamp >= 80 && renderOrderPosition === renderOrder) {
      renderOrder = !renderOrder
      lastTimestamp = timestamp

      const nextFrame = (frame + 1) % array.length

      assembly.textContent = array[nextFrame].join('\n')

      drawArray(container, nextFrame, array, renderOrderPosition)
    } else {
      frames.push(requestAnimationFrame(animate))
    }
  }
  frames.push(requestAnimationFrame(animate))
}

export const startLocomotive = () => {
  return new Promise((resolve) => {
    const locomotivePlayground = document.createElement('div')
    locomotivePlayground.id = 'sl'
    document.body.appendChild(locomotivePlayground)

    document.body.classList.add('sl')
    const track = document.createElement('pre')
    locomotivePlayground.appendChild(track)

    const beautifulClouds = document.createElement('div')
    track.appendChild(beautifulClouds)

    body.map((line) => {
      const div = document.createElement('div')
      div.textContent = line
      track.appendChild(div)
    })

    const wheelAssembly = document.createElement('div')
    track.appendChild(wheelAssembly)

    drawArray(wheelAssembly, 0, wheels, true)
    drawArray(beautifulClouds, 0, steam, false)

    locomotivePlayground.addEventListener("animationend", () => {
      track.remove()
      locomotivePlayground.remove()
      frames.forEach(frame => cancelAnimationFrame(frame))
      frames = []
      document.body.classList.remove('sl')
      resolve()
    })
  })
}