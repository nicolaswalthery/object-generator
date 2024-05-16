document.getElementById('generateBtn').addEventListener('click', function() {
    const item = generateItem();
    document.getElementById('itemOutput').innerHTML = `
        <h2>Generated Item</h2>
        <p><strong>Type:</strong> ${item.type}</p>
        <p><strong>Name:</strong> ${item.name}</p>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Qualities:</strong> ${item.qualities.join(', ')}</p>
        <p><strong>Damage:</strong> ${item.damage}</p>
        <p><strong>Critical:</strong> ${item.critical}</p>
        <p><strong>Encumbrance:</strong> ${item.encumbrance}</p>
        <p><strong>Range:</strong> ${item.range}</p>
        <p><strong>Rarity:</strong> ${item.rarity}</p>
        <p><strong>Attachment:</strong> ${item.attachment}</p>
        <p><strong>Price:</strong> ${item.price} credits</p>
    `;
});

function generateItem() {
    const itemType = Math.random() < 0.5 ? 'Weapon' : 'Armor';
    const type = getRandomType(itemType);
    const name = generateName(type);
    const category = getCategory(type);
    const qualities = getQualities(type);
    const additionalQualities = getAdditionalQualities();
    const damageRange = getDamage(type);
    const damage = pickNumberInRange(damageRange);
    const criticalRange = getCritical(type);
    const critical = pickNumberInRange(criticalRange);
    const encumbranceRange = getEncumbrance(type);
    const encumbrance = pickNumberInRange(encumbranceRange);
    const range = getRange(type);
    const rarity = getRarity(qualities.length + additionalQualities.length);
    const attachment = getAttachment(itemType);
    const price = computePrice(damage, critical, range, [...qualities, ...additionalQualities], encumbrance);

    return {
        type: itemType,
        name: name,
        category: category,
        qualities: [...qualities, ...additionalQualities],
        damage: damage,
        critical: critical,
        encumbrance: encumbrance,
        range: range,
        rarity: rarity,
        attachment: attachment,
        price: price
    };
}

function getRandomType(itemType) {
    const types = {
        Weapon: ['Slugthrower', 'Gauss / Mass drive', 'Energy / Plasma', 'Laser', 'Antics', 'Non-lethal'],
        Armor: ['Standard Clothing', 'Durable Clothing', 'Light Armor', 'Heavy Armor']
    };
    return types[itemType][Math.floor(Math.random() * types[itemType].length)];
}

function generateName(type) {
    const names = {
        'Slugthrower': ['Assault Rifle', 'Bullpup Carbine', 'Submachine Gun', 'Hand Cannon', 'Light Pistol', 'Pistol', 'Rifle', 'Combat Shotgun', 'Shotgun'],
        'Gauss / Mass drive': ['Auto-Fletcher', 'Fletcher', 'Fletcher Pistol', 'Gauss Rifle'],
        'Energy / Plasma': ['Laser Pistol', 'Laser Rifle', 'Synap Pistol', 'Plasma Rifle', 'Plasma Pistol'],
        'Laser': ['Laser Pistol', 'Laser Rifle'],
        'Antics': ['Antique Sword', 'Old Revolver'],
        'Non-lethal': ['Stun Baton', 'Tranquilizer Gun'],
        'Standard Clothing': ['Casual Wear'],
        'Durable Clothing': ['Reinforced Jacket'],
        'Light Armor': ['Tactical Vest'],
        'Heavy Armor': ['Combat Armor']
    };
    const randomName = names[type][Math.floor(Math.random() * names[type].length)];
    return `${randomName} (${type})`;
}

function getCategory(type) {
    const categories = {
        'Slugthrower': ['Ranged (Heavy)', 'Ranged (Light)'],
        'Gauss / Mass drive': ['Ranged (Heavy)', 'Ranged (Light)'],
        'Energy / Plasma': ['Ranged (Heavy)', 'Ranged (Light)'],
        'Laser': ['Ranged (Light)'],
        'Antics': ['Melee', 'Ranged (Light)'],
        'Non-lethal': ['Melee', 'Ranged (Light)'],
        'Standard Clothing': ['Light'],
        'Durable Clothing': ['Light'],
        'Light Armor': ['Medium'],
        'Heavy Armor': ['Heavy']
    };
    return categories[type][Math.floor(Math.random() * categories[type].length)];
}

function getQualities(type) {
    const qualities = {
        'Slugthrower': ['Auto-fire', 'Accurate 1', 'Blast 5', 'Inaccurate 1', 'Vicious 2'],
        'Gauss / Mass drive': ['Pierce 2', 'Blast 4', 'Vicious 3'],
        'Energy / Plasma': ['Charge 1', 'Burn 1'],
        'Laser': ['Accurate 1', 'Burn 1'],
        'Antics': ['Not Smart'],
        'Non-lethal': ['Stun', 'Desorient', 'Stun Damage'],
        'Standard Clothing': ['None'],
        'Durable Clothing': ['None'],
        'Light Armor': ['None'],
        'Heavy Armor': ['None']
    };
    const numQualities = Math.floor(Math.random() * 4); // 0 to 3 qualities
    const selectedQualities = [];
    for (let i = 0; i < numQualities; i++) {
        const quality = qualities[type][Math.floor(Math.random() * qualities[type].length)];
        if (!selectedQualities.includes(quality)) {
            selectedQualities.push(quality);
        }
    }
    return selectedQualities;
}

function getDamage(type) {
    const damage = {
        'Slugthrower': '7-8',
        'Gauss / Mass drive': '3-10',
        'Energy / Plasma': '5-10',
        'Laser': '6-8',
        'Antics': '1-5',
        'Non-lethal': '2-5',
        'Standard Clothing': '0',
        'Durable Clothing': '0',
        'Light Armor': '0',
        'Heavy Armor': '0'
    };
    return damage[type];
}

function getCritical(type) {
    const critical = {
        'Slugthrower': '3-4',
        'Gauss / Mass drive': '2-3',
        'Energy / Plasma': '2-3',
        'Laser': '2-3',
        'Antics': '3-5',
        'Non-lethal': '5-6',
        'Standard Clothing': '0',
        'Durable Clothing': '0',
        'Light Armor': '0',
        'Heavy Armor': '0'
    };
    return critical[type];
}

function getEncumbrance(type) {
    const encumbrance = {
        'Slugthrower': '1-4',
        'Gauss / Mass drive': '2-5',
        'Energy / Plasma': '1-4',
        'Laser': '1-2',
        'Antics': '1-3',
        'Non-lethal': '1-2',
        'Standard Clothing': '1',
        'Durable Clothing': '1',
        'Light Armor': '2',
        'Heavy Armor': '3'
    };
    return encumbrance[type];
}

function getRange(type) {
    const range = {
        'Slugthrower': ['Short', 'Medium', 'Long'],
        'Gauss / Mass drive': ['Medium', 'Long', 'Extreme'],
        'Energy / Plasma': ['Short', 'Medium', 'Long'],
        'Laser': ['Short', 'Medium'],
        'Antics': ['Short', 'Medium'],
        'Non-lethal': ['Short', 'Medium'],
        'Standard Clothing': ['N/A'],
        'Durable Clothing': ['N/A'],
        'Light Armor': ['N/A'],
        'Heavy Armor': ['N/A']
    };
    return range[type][Math.floor(Math.random() * range[type].length)];
}

function getRarity(numQualities) {
    return Math.min(numQualities + 1, 10); // Rarity is 1 + number of qualities, max 10
}

function getAttachment(itemType) {
    const attachments = {
        Weapon: ['Ammo Counter', 'Balanced Hilt', 'Ballistic Targeting Display', 'Bipod Mount', 'BMI-Linked Trigger', 'Enhanced Weight', 'Recoil Compensators', 'Shortened Barrel', 'Superior Weapon Customization', 'Target-Selection System', 'Targeting Reticle', 'Telescopic Sight', 'Torso Combat Harness', 'Weapon Lockout', 'Weapon Sling'],
        Armor: ['Ballistic Plates', 'Buckyweave Enhancement', 'Enhanced Optics Suite', 'Intimidating Paint Job', 'Jump Jets', 'Street Wear', 'Strength-Enhancing System', 'Vacuum Sealed']
    };
    return attachments[itemType][Math.floor(Math.random() * attachments[itemType].length)];
}

function pickNumberInRange(rangeStr) {
    const [min, max] = rangeStr.split('-').map(Number);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function computePrice(damage, critical, range, qualities, encumbrance) {
    let price = 0;

    // Calculate price based on damage
    if (damage <= 5) {
        price += 100;
    } else if (damage <= 7) {
        price += 250;
    } else if (damage <= 9) {
        price += 500;
    } else {
        price += 1000;
    }

    // Calculate price based on critical rating
    if (critical <= 3) {
        price += 600;
    } else if (critical <= 4) {
        price += 300;
    } else if (critical <= 5) {
        price += 150;
    } else {
        price += 0;
    }

    // Calculate price based on range
    if (range === 'Short') {
        price += 0;
    } else if (range === 'Medium') {
        price += 100;
    } else if (range === 'Long') {
        price += 300;
    } else {
        price += 600;
    }

    // Calculate price based on qualities
    qualities.forEach(quality => {
        switch (quality) {
            case 'Auto-fire':
            case 'Blast':
            case 'Burn':
                price += 200;
                break;
            case 'Accurate':
            case 'Pierce':
            case 'Stun':
                price += 50;
                break;
            case 'Cumbersome':
            case 'Inaccurate':
                price -= 100;
                break;
            default:
                price += 100;
                break;
        }
    });

    // Calculate price based on encumbrance
    if (encumbrance <= 1) {
        price += 50;
    } else if (encumbrance <= 2) {
        price += 100;
    } else if (encumbrance <= 3) {
        price += 200;
    } else {
        price += 300;
    }

    return price;
}

function getAdditionalQualities() {
    const qualities = [
        'Accurate', 'Auto-Fire', 'Blast', 'Breach', 'Burn', 'Concussive', 'Cumbersome', 'Defensive', 'Deflection',
        'Disorient', 'Ensnare', 'Guided', 'Inaccurate', 'Inferior', 'Knockdown', 'Limited Ammo', 'Linked', 'Pierce',
        'Prepare', 'Reinforced', 'Slow-Firing', 'Stun', 'Stun Damage', 'Sunder', 'Superior', 'Tractor', 'Unwieldy', 'Vicious'
    ];

    const numQualities = Math.floor(Math.random() * 4); // 0 to 3 additional qualities
    const selectedQualities = [];
    for (let i = 0; i < numQualities; i++) {
        const quality = qualities[Math.floor(Math.random() * qualities.length)];
        if (!selectedQualities.includes(quality)) {
            selectedQualities.push(quality);
        }
    }
    return selectedQualities;
}