/* eslint global-require: 0 */

export const teams = {
  ru: {
    id: 0,
    key: 'ru',
    name: '俄罗斯',
    flag: require('./assets/flags/ru.svg'),
  },
  sa: {
    id: 1,
    key: 'sa',
    name: '沙特阿拉伯',
    flag: require('./assets/flags/sa.svg'),
  },
  eg: {
    id: 2,
    key: 'eg',
    name: '埃及',
    flag: require('./assets/flags/eg.svg'),
  },
  uy: {
    id: 3,
    key: 'uy',
    name: '乌拉圭',
    flag: require('./assets/flags/uy.svg'),
  },
  pt: {
    id: 4,
    key: 'pt',
    name: '葡萄牙',
    flag: require('./assets/flags/pt.svg'),
  },
  es: {
    id: 5,
    key: 'es',
    name: '西班牙',
    flag: require('./assets/flags/es.svg'),
  },
  ma: {
    id: 6,
    key: 'ma',
    name: '摩洛哥',
    flag: require('./assets/flags/ma.svg'),
  },
  ir: {
    id: 7,
    key: 'ir',
    name: '伊朗',
    flag: require('./assets/flags/ir.svg'),
  },
  fr: {
    id: 8,
    key: 'fr',
    name: '法国',
    flag: require('./assets/flags/fr.svg'),
  },
  au: {
    id: 9,
    key: 'au',
    name: '澳大利亚',
    flag: require('./assets/flags/au.svg'),
  },
  pe: {
    id: 10,
    key: 'pe',
    name: '秘鲁',
    flag: require('./assets/flags/pe.svg'),
  },
  dk: {
    id: 11,
    key: 'dk',
    name: '丹麦',
    flag: require('./assets/flags/dk.svg'),
  },
  ar: {
    id: 12,
    key: 'ar',
    name: '阿根廷',
    flag: require('./assets/flags/ar.svg'),
  },
  is: {
    id: 13,
    key: 'is',
    name: '冰岛',
    flag: require('./assets/flags/is.svg'),
  },
  hr: {
    id: 14,
    key: 'hr',
    name: '克罗地亚',
    flag: require('./assets/flags/hr.svg'),
  },
  ng: {
    id: 15,
    key: 'ng',
    name: '尼日利亚',
    flag: require('./assets/flags/ng.svg'),
  },
  br: {
    id: 16,
    key: 'br',
    name: '巴西',
    flag: require('./assets/flags/br.svg'),
  },
  ch: {
    id: 17,
    key: 'ch',
    name: '瑞士',
    flag: require('./assets/flags/ch.svg'),
  },
  cr: {
    id: 18,
    key: 'cr',
    name: '哥斯达黎加',
    flag: require('./assets/flags/cr.svg'),
  },
  rs: {
    id: 19,
    key: 'rs',
    name: '塞尔维亚',
    flag: require('./assets/flags/rs.svg'),
  },
  de: {
    id: 20,
    key: 'de',
    name: '德国',
    flag: require('./assets/flags/de.svg'),
  },
  mx: {
    id: 21,
    key: 'mx',
    name: '墨西哥',
    flag: require('./assets/flags/mx.svg'),
  },
  se: {
    id: 22,
    key: 'se',
    name: '瑞典',
    flag: require('./assets/flags/se.svg'),
  },
  kr: {
    id: 23,
    key: 'kr',
    name: '韩国',
    flag: require('./assets/flags/kr.svg'),
  },
  be: {
    id: 24,
    key: 'be',
    name: '比利时',
    flag: require('./assets/flags/be.svg'),
  },
  pa: {
    id: 25,
    key: 'pa',
    name: '巴拿马',
    flag: require('./assets/flags/pa.svg'),
  },
  tn: {
    id: 26,
    key: 'tn',
    name: '突尼斯',
    flag: require('./assets/flags/tn.svg'),
  },
  en: {
    id: 27,
    key: 'en',
    name: '英格兰',
    flag: require('./assets/flags/gb-eng.svg'),
  },
  pl: {
    id: 28,
    key: 'pl',
    name: '波兰',
    flag: require('./assets/flags/pl.svg'),
  },
  sn: {
    id: 29,
    key: 'sn',
    name: '塞内加尔',
    flag: require('./assets/flags/sn.svg'),
  },
  co: {
    id: 30,
    key: 'co',
    name: '哥伦比亚',
    flag: require('./assets/flags/co.svg'),
  },
  jp: {
    id: 31,
    key: 'jp',
    name: '日本',
    flag: require('./assets/flags/jp.svg'),
  },
};

export const teamKeys = [
  'ru', 'sa', 'eg', 'uy', 'pt', 'es', 'ma', 'ir',
  'fr', 'au', 'pe', 'dk', 'ar', 'is', 'hr', 'ng',
  'br', 'ch', 'cr', 'rs', 'de', 'mx', 'se', 'kr',
  'be', 'pa', 'tn', 'en', 'pl', 'sn', 'co', 'jp',
];

export const groups = {
  a: { key: 'a', name: 'A组', teams: [teams.ru, teams.sa, teams.eg, teams.uy] },
  b: { key: 'b', name: 'B组', teams: [teams.pt, teams.es, teams.ma, teams.ir] },
  c: { key: 'c', name: 'C组', teams: [teams.fr, teams.au, teams.pe, teams.dk] },
  d: { key: 'd', name: 'D组', teams: [teams.ar, teams.is, teams.hr, teams.ng] },
  e: { key: 'e', name: 'E组', teams: [teams.br, teams.ch, teams.cr, teams.rs] },
  f: { key: 'f', name: 'F组', teams: [teams.de, teams.mx, teams.se, teams.kr] },
  g: { key: 'g', name: 'G组', teams: [teams.be, teams.pa, teams.tn, teams.en] },
  h: { key: 'h', name: 'H组', teams: [teams.pl, teams.sn, teams.co, teams.jp] },
};
