/**
 * StatementLens — logic verification tests
 * Run with: node test-logic.js
 * (Node.js available on this Pi for quick verification)
 *
 * Tests the categorize(), parseAmount(), parseDate(), and detectCols() functions
 * using the same logic as index.html, without browser APIs.
 */

'use strict';

// ── Inline the same CATS and logic from index.html ──

const CATS = {
  'Food & Drink': {
    kw: ['starbucks','mcdonalds','mcdonald','mc donalds','subway','chipotle','domino','pizza',
         'burger king','taco bell','wendy','popeyes','chick-fil','chick fil','panera','dunkin',
         'krispy kreme','olive garden','cheesecake factory','applebee','denny','ihop',
         'waffle house','sushi','ramen','in-n-out','in n out','five guys','shake shack',
         'jersey mike','wingstop','little caesar','whataburger','sonic drive','raising cane',
         'sweetgreen','cava ','chipotle','doordash','grubhub','uber eats','ubereats',
         'instacart','postmates','door dash','seamless','gopuff','caviar ',
         'safeway','kroger','publix','aldi','trader joe','whole foods','wholefds','wfm ',
         'wegmans','food lion','stop & shop','sprouts','market basket','giant food',
         'vons','ralphs','costco food','fresh market','tst*','tst ',
         'deli','bakery','cafe','coffee','tea house','juice bar','smoothie',
         'restaurant','dining','bistro','tavern','grill','kitchen','eatery','diner',
         'grocery','supermarket','food mart','food market','fast food','food co-op',
         'seven eleven food','convenience store']
  },
  'Shopping': {
    kw: ['amzn mktp','amzn mktp us','amazon','wal-mart','wal mart','walmart','target',
         'ebay','etsy','best buy','bestbuy','home depot','homedepot','lowes',"lowe's",
         'ikea','costco whse','costco','wayfair','chewy','gap ','h&m','zara','nordstrom',
         'macy','bloomingdale','kohl','tj maxx','tjmaxx','marshalls','ross dress',
         'old navy','banana republic','express fashion','forever 21','bath & body',
         'victoria secret','gamestop','b&h photo','newegg','rei.com','apple store ',
         'patagonia','nike','adidas','under armour',"dick's sporting",'sport chalet',
         'academy sports','overstock','petco','petsmart','dollar general','dollar tree',
         'five below','world market']
  },
  'Transport': {
    kw: ['uber','lyft','parking','exxon','shell oil','bp oil','chevron','citgo','sunoco',
         'marathon oil','speedway','wawa gas','quiktrip',"casey's gas",'kwik trip',
         '7-eleven fuel','pilot travel',"love's fuel",'circle k','gasoline','gas station',
         'metro transit','mbta','mta bus','bart ','cta ','septa','wmata','trimet',
         'amtrak','greyhound','megabus','flixbus',
         'delta air','american airlines','united airlines','southwest air','jetblue',
         'spirit airlines','frontier air','alaska air','allegiant air',
         'enterprise rent','hertz','avis','budget rent','national car','zipcar','turo']
  },
  'Housing': {
    kw: ['rent payment','monthly rent','lease payment','rent pmt','apt rent','landlord',
         ' rent ','hoa ','hoa fee','homeowner','homeowners ins','home loan',
         'mortgage','mortgage pmt','property tax','storage unit','u-haul','uhaul',
         'pods moving','moving company','realty','property management','airbnb','vrbo']
  },
  'Healthcare': {
    kw: ['cvs pharmacy','cvs/pharmacy','walgreens','rite aid','pharmacy','medical center',
         'dental','doctor','hospital','clinic','urgent care','kaiser','aetna','cigna',
         'humana','united health','anthem','bcbs','blue cross','blue shield','optum',
         'labcorp','quest diagnostics','imaging center','physical therapy','chiropractic',
         'optometry','vision center','eyecare','eye exam','prescription','rx ']
  },
  'Entertainment': {
    kw: ['netflix','spotify','hulu','disney+','disney plus','apple tv','apple music',
         'hbo max','hbo now','peacock','paramount+','showtime','starz','crunchyroll',
         'youtube premium','amazon prime video','tidal','pandora','sirius xm','siriusxm',
         'movie theater','cinema','regal','amc theater','cinemark','fandango','ticketmaster',
         'stubhub','vivid seats','seatgeek','concert','museum','zoo','aquarium',
         'theme park','six flags','cedar point','universal studios','disney world',
         'bowling','laser tag','mini golf','escape room','trampoline park',
         'dave & buster','dave and buster','arcade','steam purchase','playstation store',
         'nintendo eshop','xbox game','epic games','microsoft store games']
  },
  'Subscriptions': {
    kw: ['amazon web services','aws, inc','aws.amazon',
         'apple.com/bill','apl*apple','apl*itunes','itunes.com',
         'google one','google storage','google *gsuite','google workspace',
         'icloud+','icloud storage','microsoft 365','office 365','adobe creative',
         'dropbox','box.com','notion ','slack ','zoom ','canva ','figma ','github',
         'heroku','digitalocean','linode','vultr','cloudflare','namecheap','godaddy',
         'squarespace','wix ','shopify','mailchimp','zapier','airtable','monday.com',
         'asana','trello','linear ','1password','lastpass','dashlane','nordvpn',
         'expressvpn','protonvpn','mullvad','duolingo','audible','kindle unlimited',
         'scribd','medium ','substack','patreon','masterclass','coursera','udemy',
         'linkedin learning','skillshare','openai','chatgpt','anthropic','midjourney',
         'figma ','miro ','loom ','calendly','hubspot']
  },
  'Utilities': {
    kw: ['electric bill','electricity','gas utility','gas bill','water bill','sewer',
         'utility payment','comcast','xfinity','spectrum ','cox comm','at&t','verizon',
         't-mobile','tmobile','sprint','metro pcs','cricket wireless','boost mobile',
         'mint mobile','simple mobile','republic wireless','internet service','broadband',
         'cable bill','phone bill','cell phone']
  },
  'Income': {
    kw: ['payroll','direct dep','direct deposit','ach dep','salary','employer',
         'paycheck','wages','commission','freelance income','consulting',
         'dividend credit','interest credit','interest earned','refund',
         'cash back reward','cashback','rebate','stimulus','tax refund',
         'ach credit','wire credit','incoming wire','credit memo',
         'zelle from','venmo from','transfer from ','deposit from']
  },  // unchanged from cycle 5
  'Transfers': {
    kw: ['zelle payment','venmo','paypal','cash app','cashapp','apple pay','google pay',
         'bank transfer','wire transfer','ach transfer','online transfer',
         'loan payment','credit card payment','card payment','atm withdrawal','atm fee',
         'check payment','payment to']
  }
};

const CAT_NAMES = Object.keys(CATS);
const UNCATEGORIZED = 'Uncategorized';

const PRE_CHECKS = [
  { kw: 'amazon web services', cat: 'Subscriptions' },
  { kw: 'aws, inc',            cat: 'Subscriptions' },
  { kw: 'aws.amazon',          cat: 'Subscriptions' },
  { kw: 'apple.com/bill',      cat: 'Subscriptions' },
  { kw: 'apl*apple',           cat: 'Subscriptions' },
  { kw: 'apl*itunes',          cat: 'Subscriptions' },
  { kw: 'google workspace',    cat: 'Subscriptions' },
  { kw: 'uber eats',           cat: 'Food & Drink' },
  { kw: 'ubereats',            cat: 'Food & Drink' },
  { kw: 'tst*',                cat: 'Food & Drink' },
  { kw: 'tst ',                cat: 'Food & Drink' },
  { kw: 'amzn mktp',           cat: 'Shopping' },
  { kw: 'enterprise rent',     cat: 'Transport' },
  { kw: 'budget rent',         cat: 'Transport' },
];

function categorize(desc) {
  if (!desc) return UNCATEGORIZED;
  const low = desc.toLowerCase();
  for (const { kw, cat } of PRE_CHECKS) {
    if (low.includes(kw)) return cat;
  }
  for (const cat of CAT_NAMES) {
    for (const kw of CATS[cat].kw) {
      if (low.includes(kw)) return cat;
    }
  }
  const words = low.replace(/[^a-z0-9 ]/g, ' ').split(/\s+/);
  if (words.includes('rent') || words.includes('landlord')) return 'Housing';
  return UNCATEGORIZED;
}

function parseAmount(raw) {
  if (raw === null || raw === undefined || String(raw).trim() === '') return NaN;
  let s = String(raw).trim();
  const neg = (s.startsWith('(') && s.endsWith(')')) || s.startsWith('-') || s.startsWith('\u2212');
  s = s.replace(/[$£€¥\s()]/g, '').replace(/^[+\-\u2212]/, '');
  const hasDot = s.includes('.');
  const hasComma = s.includes(',');
  if (hasDot && hasComma) {
    if (s.lastIndexOf(',') > s.lastIndexOf('.')) {
      s = s.replace(/\./g, '').replace(',', '.');
    } else {
      s = s.replace(/,/g, '');
    }
  } else if (hasComma && !hasDot) {
    if (/,\d{1,2}$/.test(s)) { s = s.replace(',', '.'); }
    else { s = s.replace(/,/g, ''); }
  }
  const n = parseFloat(s);
  return isNaN(n) ? NaN : (neg ? -n : n);
}

function parseDate(raw) {
  if (!raw) return null;
  const s = String(raw).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) {
    const d = new Date(s.slice(0, 10) + 'T00:00:00');
    return isNaN(d.getTime()) ? null : d;
  }
  const m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
  if (m) {
    let yr = parseInt(m[3], 10);
    if (yr < 100) yr += yr < 50 ? 2000 : 1900;
    let part1 = parseInt(m[1], 10);
    let part2 = parseInt(m[2], 10);
    // Auto-detect DD/MM/YYYY
    if (part1 > 12 && part2 >= 1 && part2 <= 12) { [part1, part2] = [part2, part1]; }
    const d = new Date(yr, part1 - 1, part2);
    if (isNaN(d.getTime()) || d.getMonth() !== part1 - 1) return null;
    return d;
  }
  const d = new Date(raw);
  return isNaN(d.getTime()) ? null : d;
}

function detectCols(hdrs) {
  const norm = hdrs.map(h => h.toLowerCase().trim().replace(/[^a-z ]/g, ''));

  let dateIdx = -1, amtIdx = -1, descIdx = -1, debitIdx = -1, creditIdx = -1;

  const DATE_NAMES   = ['transaction date','date','posted date','post date','posting date',
                         'value date','settlement date','trans date'];
  const AMT_NAMES    = ['amount','transaction amount','net amount','value','sum'];
  const DESC_NAMES   = ['description','memo','merchant name','payee','merchant',
                         'transaction description','narration','details','name',
                         'reference','particulars'];
  const DEBIT_NAMES  = ['debit','debit amount','withdrawal','withdrawals','charge','charged'];
  const CREDIT_NAMES = ['credit','credit amount','deposit','deposits','payment received'];

  const firstMatch = (list, norms) => {
    for (const n of list) { const i = norms.indexOf(n); if (i >= 0) return i; }
    return -1;
  };

  dateIdx   = firstMatch(DATE_NAMES,   norm);
  amtIdx    = firstMatch(AMT_NAMES,    norm);
  descIdx   = firstMatch(DESC_NAMES,   norm);
  debitIdx  = firstMatch(DEBIT_NAMES,  norm);
  creditIdx = firstMatch(CREDIT_NAMES, norm);

  if (dateIdx  < 0) norm.forEach((h, i) => { if (h.includes('date')   && dateIdx  < 0) dateIdx  = i; });
  if (amtIdx   < 0) norm.forEach((h, i) => { if (h.includes('amount') && amtIdx   < 0) amtIdx   = i; });
  if (descIdx  < 0) norm.forEach((h, i) => { if ((h.includes('desc') || h.includes('memo') || h.includes('payee')) && descIdx < 0) descIdx = i; });

  let bank = '';
  if      (norm.includes('transaction date') && norm.includes('post date')) bank = 'Chase';
  else if (norm.includes('posted date') && norm.includes('reference number')) bank = 'Bank of America';
  else if (norm.includes('posted date') && norm.includes('payee')) bank = 'Bank of America';
  else if (debitIdx >= 0 && creditIdx >= 0 && norm.includes('transaction date')) bank = 'Capital One';
  else if (norm.includes('time') && norm.includes('type') && norm.includes('amount')) bank = 'Ally';
  else if (norm.includes('trans date') && norm.includes('post date')) bank = 'Discover';
  else if (norm.includes('status') && debitIdx >= 0 && creditIdx >= 0) bank = 'Citibank';
  else if (norm.some(h => h.includes('extended details') || h.includes('appears on your statement'))) bank = 'American Express';
  else if (norm.includes('balance') && debitIdx >= 0 && creditIdx >= 0) bank = 'TD Bank';
  else if (norm.filter(h => h === '').length >= 1 && dateIdx >= 0 && amtIdx >= 0 && descIdx >= 0) bank = 'Wells Fargo';

  let confidence = 0;
  if (dateIdx >= 0) confidence++;
  if (amtIdx >= 0 || (debitIdx >= 0 && creditIdx >= 0)) confidence++;
  if (descIdx >= 0) confidence++;

  return { dateIdx, amtIdx, descIdx, debitIdx, creditIdx, bank, confidence };
}

// ── detectDelimiter (inline for test — same logic as index.html) ──
function detectDelimiter(text) {
  const firstLine = text.split(/\r?\n/).find(l => l.trim().length > 0) || '';
  let counts = { ',': 0, ';': 0, '\t': 0 };
  let inQ = false;
  for (const ch of firstLine) {
    if      (ch === '"') inQ = !inQ;
    else if (!inQ && ch in counts) counts[ch]++;
  }
  const max = Math.max(...Object.values(counts));
  if (max === 0) return ',';
  if (counts[','] === max) return ',';
  if (counts[';'] === max) return ';';
  return '\t';
}

// Load the marked pure-logic block from the shipping app and replace the legacy
// local copies above. This makes every test below exercise index.html itself.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const appHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const coreMatch = appHtml.match(/\/\* STATEMENTLENS_CORE_START[\s\S]*?\*\/([\s\S]*?)\/\* STATEMENTLENS_CORE_END \*\//);
if (!coreMatch) throw new Error('Could not find the StatementLens core markers in index.html');

const coreContext = {};
vm.runInNewContext(
  coreMatch[1] + '\n;globalThis.__statementLensCore = {' +
  'categorize, parseAmount, parseDate, detectCols, detectDelimiter, parseCSV, ' +
  'findHeaderRowIdx, buildTransactions, csvCell};',
  coreContext,
  { filename: 'index.html#statementlens-core' }
);
const actualCore = coreContext.__statementLensCore;
categorize = actualCore.categorize;
parseAmount = actualCore.parseAmount;
parseDate = actualCore.parseDate;
detectCols = actualCore.detectCols;
detectDelimiter = actualCore.detectDelimiter;
findHeaderRowIdx = actualCore.findHeaderRowIdx;
const parseCSV = actualCore.parseCSV;
const buildTransactions = actualCore.buildTransactions;
const csvCell = actualCore.csvCell;

// ── Test runner ──
let passed = 0, failed = 0;

function test(label, actual, expected) {
  if (actual === expected) {
    console.log('  ✓', label);
    passed++;
  } else {
    console.log('  ✗', label);
    console.log('    expected:', JSON.stringify(expected));
    console.log('    actual:  ', JSON.stringify(actual));
    failed++;
  }
}

// ─────────────────────────────────────────────
// CATEGORIZE tests
// ─────────────────────────────────────────────
console.log('\nCATEGORIZE');

// Food & Drink
test('Starbucks',                    categorize('STARBUCKS #1234'),              'Food & Drink');
test('DoorDash',                     categorize('DOORDASH*PIZZA'),               'Food & Drink');
test('Uber Eats',                    categorize('UBER EATS 87HFGK'),             'Food & Drink');
test('Uber trip (not food)',         categorize('UBER TRIP 87HFGK'),             'Transport');
test('Grocery store generic',        categorize('LOCAL GROCERY STORE'),          'Food & Drink');
test('Supermarket',                  categorize('FRESH SUPERMARKET #12'),        'Food & Drink');
test('Fast food',                    categorize('FAST FOOD RESTAURANT'),         'Food & Drink');
test('Safeway',                      categorize('SAFEWAY STORES 0123'),          'Food & Drink');
test('Kroger',                       categorize('KROGER #0456 FUEL'),            'Food & Drink');
test('Whole Foods abbreviation',     categorize('WHOLEFDS #10 BOSTON'),          'Food & Drink');
test('Trader Joes',                  categorize("TRADER JOE'S 123"),             'Food & Drink');

// Shopping
test('Amazon purchase',              categorize('AMAZON.COM*1234ABCD'),          'Shopping');
test('Target',                       categorize('TARGET 00123456'),              'Shopping');
test('Home Depot',                   categorize('THE HOME DEPOT #0123'),         'Shopping');
test('Walmart',                      categorize('WALMART SUPERCENTER'),          'Shopping');

// Transport
test('Uber ride',                    categorize('UBER* TRIP'),                   'Transport');
test('Lyft',                         categorize('LYFT *RIDE WED 8PM'),           'Transport');
test('Shell gas',                    categorize('SHELL OIL 12345678'),           'Transport');
test('Enterprise rent-a-car',        categorize('ENTERPRISE RENT-A-CAR #12'),   'Transport');
test('Amtrak',                       categorize('AMTRAK TICKET'),               'Transport');
test('Delta airline',                categorize('DELTA AIR LINES'),              'Transport');
test('Parking',                      categorize('CITY PARKING METER'),           'Transport');

// Housing — this is the key fix
test('Rent payment (generic)',       categorize('RENT PMT JOHN SMITH'),          'Housing');
test('Rent word boundary',           categorize('RENT 0512 EASTVIEW APTS'),      'Housing');
test('Landlord',                     categorize('LANDLORD MONTHLY'),             'Housing');
test('Mortgage',                     categorize('MORTGAGE PAYMENT'),             'Housing');
test('Airbnb',                       categorize('AIRBNB * HMXYZ8'),              'Housing');
test('HOA fee',                      categorize('HOA FEE PAYMENT'),              'Housing');
test('current (NOT rent)',           categorize('CURRENT ACCOUNT BALANCE'),      'Uncategorized');
test('parent (NOT rent)',            categorize('PARENT PORTAL PAYMENT'),        'Uncategorized');
test('apparent (NOT rent)',          categorize('APPARENT AUTHORITY CORP'),      'Uncategorized');

// Healthcare
test('CVS Pharmacy',                 categorize('CVS/PHARMACY #01234'),          'Healthcare');
test('Walgreens',                    categorize('WALGREENS #9999'),              'Healthcare');
test('Doctor visit',                 categorize('DR SMITH FAMILY DOCTOR'),       'Healthcare');
test('Hospital',                     categorize('GENERAL HOSPITAL BILLING'),     'Healthcare');

// Entertainment
test('Netflix',                      categorize('NETFLIX.COM'),                  'Entertainment');
test('Spotify',                      categorize('SPOTIFY USA'),                  'Entertainment');
test('AMC Theaters',                 categorize('AMC THEATER #0123'),            'Entertainment');

// Subscriptions
test('Adobe',                        categorize('ADOBE CREATIVE CLOUD'),         'Subscriptions');
test('GitHub',                       categorize('GITHUB INC'),                   'Subscriptions');
test('Dropbox',                      categorize('DROPBOX INC'),                  'Subscriptions');
test('AWS (pre-check)',               categorize('AMAZON WEB SERVICES IN'),       'Subscriptions');
test('Apple.com/bill',               categorize('APPLE.COM/BILL'),               'Subscriptions');
test('OpenAI subscription',          categorize('OPENAI *CHATGPT PLUS'),         'Subscriptions');
test('AMZN MKTP → Shopping',         categorize('AMZN MKTP US*1A2B3C'),         'Shopping');
test('Whole Foods (WHOLEFDS)',        categorize('WHOLEFDS MKT #10 BOSTON'),     'Food & Drink');
test('Chick fil A (space)',           categorize('CHICK FIL A 00123'),           'Food & Drink');
test('TST* Toast POS',               categorize('TST* MIKES PIZZA HOUSE'),      'Food & Drink');
test('Costco Whse',                  categorize('COSTCO WHSE #1234'),           'Shopping');
test('Shake Shack',                  categorize('SHAKE SHACK 0123'),            'Food & Drink');
test('Five Guys',                    categorize('FIVE GUYS #0456'),             'Food & Drink');
test('Wal-Mart',                     categorize('WAL-MART #4567'),              'Shopping');

// Utilities
test('Comcast',                      categorize('COMCAST CABLE'),                'Utilities');
test('AT&T phone',                   categorize('AT&T MOBILITY'),                'Utilities');
test('Verizon',                      categorize('VERIZON WIRELESS'),             'Utilities');
test('Electric bill',                categorize('ELECTRIC BILL PAYMENT'),        'Utilities');

// Income
test('Direct deposit (full)',        categorize('DIRECT DEPOSIT PAYROLL'),       'Income');
test('Direct dep (truncated)',       categorize('DIRECT DEP 020124 EMPLOYER'),   'Income');
test('ACH deposit',                  categorize('ACH DEP PAYROLL'),              'Income');
test('Salary',                       categorize('SALARY PAYMENT'),               'Income');
test('Tax refund',                   categorize('IRS TREAS 310 TAX REF'),        'Income');
test('Payroll',                      categorize('ADP PAYROLL SERVICES'),         'Income');

// Transfers
test('Zelle payment',                categorize('ZELLE PAYMENT TO JANE'),        'Transfers');
test('Venmo (to)',                    categorize('VENMO PAYMENT TO JOHN'),        'Transfers');
test('Venmo (from) → Income',        categorize('VENMO FROM ALICE'),             'Income');
test('PayPal',                       categorize('PAYPAL *TRANSFER'),             'Transfers');
test('ATM',                          categorize('ATM WITHDRAWAL BANK 1234'),     'Transfers');

// ─────────────────────────────────────────────
// PARSE AMOUNT tests
// ─────────────────────────────────────────────
console.log('\nPARSE AMOUNT');

// US format
test('Negative plain',              parseAmount('-50.00'),              -50.00);
test('Positive plain',              parseAmount('200.00'),               200.00);
test('With dollar sign',            parseAmount('$1,234.56'),            1234.56);
test('Negative with dollar sign',   parseAmount('-$99.99'),             -99.99);
test('Parenthetical negative',      parseAmount('(100.00)'),            -100.00);
test('Zero',                        parseAmount('0.00'),                 0.00);
test('US thousands comma',          parseAmount('1,000,000.00'),         1000000.00);
test('Empty string → NaN',          isNaN(parseAmount('')),              true);
test('Null → NaN',                  isNaN(parseAmount(null)),            true);
// European format (comma = decimal separator)
test('EU 6,75',                     parseAmount('6,75'),                 6.75);
test('EU -6,75',                    parseAmount('-6,75'),               -6.75);
test('EU 1.234,56',                 parseAmount('1.234,56'),             1234.56);
test('EU -1.234,56',                parseAmount('-1.234,56'),           -1234.56);
test('EU with euro sign',           parseAmount('€1.234,56'),              1234.56);
test('EU (6,75) parenthetical',     parseAmount('(6,75)'),              -6.75);
test('EU 1.234.567,89',             parseAmount('1.234.567,89'),         1234567.89);
// US thousands comma (no decimal) — 3 digits after comma = thousands sep
test('US 1,234 (thousands)',        parseAmount('1,234'),                1234);
test('US 100,000 (thousands)',      parseAmount('100,000'),              100000);

// ─────────────────────────────────────────────
// PARSE DATE tests
// ─────────────────────────────────────────────
console.log('\nPARSE DATE');

function ymd(d) { return d ? `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}` : null; }

test('ISO date',                    ymd(parseDate('2024-01-15')),       '2024-1-15');
test('ISO leap day',                ymd(parseDate('2024-02-29')),       '2024-2-29');
test('Invalid ISO Feb 31 → null',   parseDate('2024-02-31'),             null);
test('US MM/DD/YYYY',               ymd(parseDate('01/15/2024')),       '2024-1-15');
test('US MM-DD-YYYY',               ymd(parseDate('01-15-2024')),       '2024-1-15');
test('2-digit year',                ymd(parseDate('01/15/24')),         '2024-1-15');
test('Empty → null',                parseDate(''),                       null);
test('Null → null',                 parseDate(null),                     null);
// International DD/MM/YYYY (first component > 12 unambiguously means day)
test('UK 25/06/2024',               ymd(parseDate('25/06/2024')),       '2024-6-25');
test('UK 31/01/2024',               ymd(parseDate('31/01/2024')),       '2024-1-31');
test('UK 15-03-2024',               ymd(parseDate('15-03-2024')),       '2024-3-15');
// Feb 31 is invalid — should return null (not silently wrap to Mar 2)
test('Invalid Feb 31 → null',        parseDate('02/31/2024'),            null);
test('Valid Feb 28',                ymd(parseDate('02/28/2024')),       '2024-2-28');

// ─────────────────────────────────────────────
// DETECT COLS tests
// ─────────────────────────────────────────────
console.log('\nDETECT COLS — Bank formats');

// Chase credit card
{
  const r = detectCols(['Transaction Date','Post Date','Description','Category','Type','Amount','Memo']);
  test('Chase: bank name',    r.bank,       'Chase');
  test('Chase: dateIdx=0',    r.dateIdx,    0);
  test('Chase: descIdx=2',    r.descIdx,    2);
  test('Chase: amtIdx=5',     r.amtIdx,     5);
  test('Chase: confidence=3', r.confidence, 3);
}

// Bank of America (simple export with reference number)
{
  const r = detectCols(['Date','Description','Amount','Running Bal.']);
  test('BofA simple: dateIdx=0',  r.dateIdx,  0);
  test('BofA simple: descIdx=1',  r.descIdx,  1);
  test('BofA simple: amtIdx=2',   r.amtIdx,   2);
  test('BofA simple: confidence', r.confidence, 3);
}

// Bank of America (full export with payee column)
{
  const r = detectCols(['Posted Date','Reference Number','Payee','Address','Amount']);
  test('BofA full: bank name',   r.bank,      'Bank of America');
  test('BofA full: dateIdx=0',   r.dateIdx,   0);
  test('BofA full: descIdx=2',   r.descIdx,   2);
  test('BofA full: amtIdx=4',    r.amtIdx,    4);
}

// Capital One
{
  const r = detectCols(['Transaction Date','Posted Date','Card No.','Description','Category','Debit','Credit']);
  test('CapOne: bank name',    r.bank,       'Capital One');
  test('CapOne: dateIdx=0',    r.dateIdx,    0);
  test('CapOne: descIdx=3',    r.descIdx,    3);
  test('CapOne: debitIdx=5',   r.debitIdx,   5);
  test('CapOne: creditIdx=6',  r.creditIdx,  6);
  test('CapOne: amtIdx=-1',    r.amtIdx,     -1);
  test('CapOne: confidence=3', r.confidence, 3);
}

// Ally
{
  const r = detectCols(['Date','Time','Amount','Type','Description']);
  test('Ally: bank name',    r.bank,      'Ally');
  test('Ally: dateIdx=0',    r.dateIdx,   0);
  test('Ally: amtIdx=2',     r.amtIdx,    2);
  test('Ally: descIdx=4',    r.descIdx,   4);
}

// Wells Fargo (asterisks become empty strings after normalization)
{
  const r = detectCols(['Date','Amount','*','*','Description']);
  test('WF: bank name',   r.bank,      'Wells Fargo');
  test('WF: dateIdx=0',   r.dateIdx,   0);
  test('WF: amtIdx=1',    r.amtIdx,    1);
  test('WF: descIdx=4',   r.descIdx,   4);
}

// Discover (Trans. Date normalises to 'trans date')
{
  const r = detectCols(['Trans. Date','Post Date','Description','Amount','Category']);
  test('Discover: bank name',  r.bank,      'Discover');
  test('Discover: dateIdx=0',  r.dateIdx,   0);
  test('Discover: descIdx=2',  r.descIdx,   2);
  test('Discover: amtIdx=3',   r.amtIdx,    3);
}

// Citibank (Status + separate Debit/Credit)
{
  const r = detectCols(['Status','Date','Description','Debit','Credit']);
  test('Citi: bank name',   r.bank,      'Citibank');
  test('Citi: dateIdx=1',   r.dateIdx,   1);
  test('Citi: descIdx=2',   r.descIdx,   2);
  test('Citi: debitIdx=3',  r.debitIdx,  3);
  test('Citi: creditIdx=4', r.creditIdx, 4);
}

// American Express
{
  const r = detectCols(['Date','Description','Amount','Extended Details','Appears On Your Statement As','Address','City/State','Zip Code','Country','Reference','Category']);
  test('Amex: bank name',  r.bank,     'American Express');
  test('Amex: dateIdx=0',  r.dateIdx,  0);
  test('Amex: descIdx=1',  r.descIdx,  1);
  test('Amex: amtIdx=2',   r.amtIdx,   2);
}

// TD Bank (Date, Description, Credit, Debit, Balance)
{
  const r = detectCols(['Date','Description','Credit','Debit','Balance']);
  test('TD: bank name',    r.bank,      'TD Bank');
  test('TD: dateIdx=0',    r.dateIdx,   0);
  test('TD: descIdx=1',    r.descIdx,   1);
  test('TD: creditIdx=2',  r.creditIdx, 2);
  test('TD: debitIdx=3',   r.debitIdx,  3);
}

// Generic
{
  const r = detectCols(['Trans Date','Net Amount','Memo']);
  test('Generic: dateIdx=0',  r.dateIdx,  0);
  test('Generic: amtIdx=1',   r.amtIdx,   1);
  test('Generic: descIdx=2',  r.descIdx,  2);
  test('Generic: confidence', r.confidence, 3);
}

// ─────────────────────────────────────────────
// FIND HEADER ROW tests
// ─────────────────────────────────────────────
console.log('\nFIND HEADER ROW');

function findHeaderRowIdx(rows) {
  for (let i = 0; i < Math.min(8, rows.length - 1); i++) {
    const row = rows[i];
    if (!row || row.filter(c => c.trim()).length < 2) continue;
    const cols = detectCols(row);
    if (cols.confidence >= 2) return i;
  }
  return 0;
}

// Normal: header is row 0
{
  const rows = [
    ['Date','Description','Amount'],
    ['01/03/2026','STARBUCKS','-6.75']
  ];
  test('Normal: header at row 0', findHeaderRowIdx(rows), 0);
}

// BoA with metadata before header (3 metadata rows)
{
  const rows = [
    ['Account Number:','1234567890'],   // metadata row
    ['Account Type:','Checking'],        // metadata row
    ['Available Balance:','$5432.10'],   // metadata row
    ['Date','Description','Amount','Balance'],  // ← real header
    ['01/03/2026','STARBUCKS','-6.75','5425.35']
  ];
  test('BoA metadata: header at row 3', findHeaderRowIdx(rows), 3);
}

// Single-column metadata rows should be skipped
{
  const rows = [
    ['This report generated 2026-01-31'],  // 1-column junk
    [''],                                   // empty
    ['Transaction Date','Posted Date','Description','Amount','Memo'],  // ← real header
    ['01/03/2026','01/03/2026','STARBUCKS','-6.75','']
  ];
  test('Junk rows: header at row 2', findHeaderRowIdx(rows), 2);
}

// No clear header found — falls back to row 0
{
  const rows = [
    ['field1','field2','field3'],
    ['a','b','c']
  ];
  test('No header found: falls back to row 0', findHeaderRowIdx(rows), 0);
}

// ─────────────────────────────────────────────
// DETECT DELIMITER tests
// ─────────────────────────────────────────────
console.log('\nDETECT DELIMITER');

// Standard US CSV — comma
test('Comma (US CSV)',
  detectDelimiter('Date,Description,Amount\n01/03/2026,STARBUCKS,-6.75'), ',');

// European CSV — semicolon
test('Semicolon (EU CSV)',
  detectDelimiter('Datum;Beschreibung;Betrag\n03.01.2026;Starbucks;-6,75'), ';');

// Tab-delimited
test('Tab-delimited',
  detectDelimiter('Date\tDescription\tAmount\n01/03/2026\tSTARBUCKS\t-6.75'), '\t');

// Comma wins when tied (comma is default preference)
test('Empty line falls back to comma',
  detectDelimiter('\n\n'), ',');

// Quoted commas in semicolon CSV should not count
test('Quoted commas ignored in semicolon CSV',
  detectDelimiter('Date;Description;Amount\n01/03/2026;"Coffee, Inc";-6.75'), ';');

// Standard CSV with comma inside quoted field
test('Quoted commas in comma CSV still comma',
  detectDelimiter('Date,Description,Amount\n01/03/2026,"Doe, John",-6.75'), ',');

// ─────────────────────────────────────────────────
// SHIPPING SOURCE + SAFE CSV EXPORT tests
// ─────────────────────────────────────────────────
console.log('\nSHIPPING SOURCE + SAFE EXPORT');

test('Core is loaded from index.html', typeof actualCore.buildTransactions, 'function');
test('CSV parser handles quoted comma',
  parseCSV('Date,Description,Amount\n01/03/2026,"Coffee, Inc",-6.75')[1][1], 'Coffee, Inc');
test('CSV export quotes embedded quotes', csvCell('Coffee "Club"'), '"Coffee ""Club"""');
test('CSV export neutralizes equals formula', csvCell('=1+1'), '"\t=1+1"');
test('CSV export neutralizes plus formula', csvCell('+SUM(A1:A2)'), '"\t+SUM(A1:A2)"');
test('CSV export neutralizes at formula', csvCell('@SUM(A1:A2)'), '"\t@SUM(A1:A2)"');
test('Trusted numeric export stays numeric text', csvCell('-42.50', false), '"-42.50"');
{
  const cols = detectCols(['Date', 'Description', 'Amount']);
  const txs = buildTransactions([['01/03/2026', 'CVS/PHARMACY #12', '-34.50']], cols);
  test('Shipping transaction builder uses corrected categorizer', txs[0].cat, 'Healthcare');
}

// ─────────────────────────────────────────────
// RESULTS
// ─────────────────────────────────────────────
console.log(`\n${'─'.repeat(40)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  console.log('\nSome tests failed — review and fix before shipping.');
  process.exit(1);
} else {
  console.log('All tests passed ✓');
}
