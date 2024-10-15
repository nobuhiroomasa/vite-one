
import javascriptLogo from './javascript.svg'
import viteLogo from './public/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
    <header>
      <ul class="header">
          <li><a href="/vite-one/Asteroid/asteroid.htm">Asteroid</a></li>
          <li><a href="/vite-one/Blocks/blocks.htm">Blocks</a></li>
          <li><a href="/vite-one/MineSweeper/minesweeper.html">MineSweeper</a></li>
          <li><a href="/vite-one/Cave/cave.html">Cave</a></li>
          <li><a href="/vite-one/MissileCommand/missilecommand.htm">MissileCommand</a></li>
          <li><a href="/vite-one/Qix/Qix.htm">Qix</a></li>
          <li><a href="/vite-one/Invader/SpaceInvader.htm">Invader</a></li>
          <li><a href="/vite-one/Memorizer/memorizer.html">Memorizer</a></li>
          <li><a href="/vite-one/SnakeBite/SnakeBite.html">SnakeBite</a></li>
          <li><a href="/vite-one/Tetris/Tetris.htm">Tetris</a></li>
          <li><a href="/vite-one/index.html">Top</a></li>
      </ul>
      <div class="account-container">
          <div class="account-name" id="account-name"></div> <!-- アカウント名を表示する部分 -->
          <div class="dropdown-menu" id="dropdown-menu">
              <div class="nickname-input">
                  <input type="text" id="nickname" placeholder="ニックネームを入力" />
                  <button id="save-nickname">保存</button>
              </div>
          </div>
      </div>
      
    </header>
`

setupCounter(document.querySelector('#counter'))
