function test(){
    for (i = 0; i < 3; i++){
        console.log('    test '+String(i))
    }
}
function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
}

for (i = 0; i < 5; i++){
    sleep(1000)
    console.log('out '+ String(i))
    test()
}

// function test2(){
//     for (var i = 0; i < 3; i++){
//         console.log('    test '+String(i))
//     }
// }
//
// for (var i = 0; i < 3; i++){
//     console.log('out '+ String(i))
//     test2()
// }