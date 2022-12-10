const UUID = () => {
    const chars = '1234567890qwertyuiopasdfghjklzxcvbnm'
    let output= [];
    for (let i=0; i<4; i++) {
        output.push(chars[Math.floor(Math.random()*chars.length)])
    }
    return output.join('')
}

module.exports = UUID;