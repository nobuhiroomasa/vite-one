import "./scoreboard";

export function createScoreboard() {
    // スコアボード用の要素を作成
    const scoreboardContainer = document.createElement('div');
    scoreboardContainer.className = 'scoreboard-container';
    
    const scoreboard = document.createElement('div');
    scoreboard.className = 'scoreboard';

    const frame = document.createElement('img');
    frame.src = '../frame_clover01.jpg';
    frame.alt = 'スコアボードフレーム';
    frame.className = 'frame';
    
    const scoreContent = document.createElement('div');
    scoreContent.className = 'score-content';
    
    const title = document.createElement('h2');
    title.textContent = 'スコアボード';
    
    const userLabel = document.createElement('p');
    userLabel.textContent = 'ユーザー名: ';
    const username = document.createElement('span');
    username.id = 'username';
    username.textContent = '---ユーザー---';
    userLabel.appendChild(username);
    
    const scoreLabel = document.createElement('p');
    scoreLabel.textContent = 'スコア: ';
    const userscore = document.createElement('span');
    userscore.id = 'userscore';
    userscore.textContent = '---';
    scoreLabel.appendChild(userscore);
    
    // スコアコンテンツをスコアボードに追加
    scoreContent.appendChild(title);
    scoreContent.appendChild(userLabel);
    scoreContent.appendChild(scoreLabel);
    scoreboard.appendChild(frame);
    scoreboard.appendChild(scoreContent);
    scoreboardContainer.appendChild(scoreboard);
    
    // bodyにスコアボードを追加
    document.body.appendChild(scoreboardContainer);

    // 仮のデータを設定
    const userData = {
        name: "テストユーザー",
        score: 1500
    };

    // データを表示する
    username.textContent = userData.name;
    userscore.textContent = userData.score;
}
