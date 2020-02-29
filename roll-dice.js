function rolldice() {
    return new Promise((resolve) =>{
         setTimeout(() =>{
            resolve(Math.ceil(Math.random()*6)+1);
        },   1000);
    });
}

module.exports = rolldice;