const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const scrapeData = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const unitName = $('h1').text().trim();
    const hitPoints = parseInt($('th:contains("HP")').next().text().trim(), 10);
    const cooldown = parseFloat($('th:contains("Cooldown")').next().text().trim());
    const minDamage = parseInt($('th:contains("Damage")').next().text().split('-')[0].trim(), 10);
    const maxDamage = parseInt($('th:contains("Damage")').next().text().split('-')[1].trim(), 10);
    const armorType = $('th:contains("Armor type")').next().text().trim();
    const weaponType = $('th:contains("Weapon type")').next().text().trim();
    const armor = parseInt($('th:contains("Armor")').next().text().trim(), 10);

    const unitData = {
      name: unitName,
      hit_points: hitPoints,
      cooldown: cooldown,
      min_damage: minDamage,
      max_damage: maxDamage,
      armor_type: armorType,
      weapon_type: weaponType,
      armor: armor,
    };

    const jsonData = JSON.stringify({ [unitName]: unitData }, null, 2);
    fs.writeFileSync('src/data/units.json', jsonData);

    console.log('Data scraped and saved successfully');
  } catch (error) {
    console.error('Error scraping data:', error);
  }
};

scrapeData('https://liquipedia.net/warcraft/Grunt');
