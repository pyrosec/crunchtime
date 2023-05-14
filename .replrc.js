'use strict';

var fetch = require('node-fetch');

var exists = (text) => {
  return !Boolean(text.match('tgme_icon_user'));
};

var ln = (v) => ((console.log(v)), v);
var checkForTelegram = async (data) => {
  const contact = (((data.data || {}).contact || [])[0] || '').replace(/\s/g, '');
  const namePage = await (await fetch('https://t.me/' + contact)).text();
  if (exists(namePage)) {
    data.contactTelegram = '@' + contact;
    return ln(data.contactTelegram);
  }
  const company = data.name.replace(/\s/g, '');
  const companyPage = await (await fetch('https://t.me/' + company)).text();
  if (exists(companyPage)) {
    data.contactTelegram = '@' + company;
    return ln(data.contactTelegram);
  }
  return data;
};

var checkForTelegrams = async (set) => {
  for (const data of set) {
    await checkForTelegram(data);
  }
};

