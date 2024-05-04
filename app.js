const fs = require('fs');

const tankSkinDir = 'C:/Program Files (x86)/Steam/steamapps/common/War Thunder/masterSkinTanks/'
const designSkinDir = 'C:/Program Files (x86)/Steam/steamapps/common/War Thunder/masterSkinDesign/'
const userSkinsTestDir = 'C:/Program Files (x86)/Steam/steamapps/common/War Thunder/UserSkins/'

console.log("app start")

function buildDesigns() {
    fs.readdir(tankSkinDir, (err, tankSkins) => {
        tankSkins.forEach(tankSkin => design(tankSkin))
    });
}

function getTankFiles(path) {
    fs.readdir(path, (err, files) => {
        return files
    });
}

function design(tankSpecification) {
    fs.readdir(designSkinDir, (err, designs) => {
        designs.forEach(design => {
            const newDesignDir = userSkinsTestDir + tankSpecification + '-' + design;
            const getDesignDir = designSkinDir + design;
            if (!fs.existsSync(newDesignDir)) {
                fs.mkdirSync(newDesignDir);
                fs.readdir(tankSkinDir + tankSpecification, (err, files) => {
                    files.forEach(file => {
                        if (file.includes('body')) {
                            fs.copyFile(getDesignDir + '/' + 'body.tga', newDesignDir + '/' + file, 
                            err => console.error('body', err));
                        } else if (file.includes('gun')) {
                            fs.copyFile(getDesignDir + '/' + 'gun.tga', newDesignDir + '/' + file, 
                            err => console.error('gun', err));
                        } else if (file.includes('turret')) {
                            fs.copyFile(getDesignDir + '/' + 'turret.tga', newDesignDir + '/' + file, 
                            err => console.error('turret', err));
                        } else if (file.includes('track')) {
                            fs.copyFile(getDesignDir + '/' + 'track.tga', newDesignDir + '/' + file, 
                            err => console.error('track', err));
                        } else if (file.includes('addarmor')) {
                            fs.copyFile(getDesignDir + '/' + 'addarmor.tga', newDesignDir + '/' + file, 
                            err => console.error('addarmor', err));      
                        } else if (file.includes('ussr_asu_57')) {
                            fs.copyFile(getDesignDir + '/' + 'ussr_asu_57.blk', newDesignDir + '/' + file, 
                            err => console.error('ussr_asu_57', err));                  
                        } else if (file.includes('asu_57')) {
                                fs.copyFile(getDesignDir + '/' + 'asu_57.tga', newDesignDir + '/' + file, 
                                err => console.error('asu_57', err));    
                        } else if (file.includes('ussr_camo_green')) {
                                fs.copyFile(getDesignDir + '/' + 'ussr_camo_green.tga', newDesignDir + '/' + file, 
                                err => console.error('ussr_camo_green', err));
                        } else {
                            fs.copyFile(tankSkinDir + tankSpecification + '/' + file, newDesignDir + '/' + file, 
                            err => console.error('all', err));
                        }
                    })
                });
            }
        })
    });
}

buildDesigns();