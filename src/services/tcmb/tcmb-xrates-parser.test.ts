import { expect, test, describe } from 'bun:test';
import assert from 'node:assert';
import parseTcmbDailyKurlarXML from './tcmb-xrates-parser';

describe('tcmb-xrates', () => {
  test('test tcmb-xrates', async () => {
    const result = await parseTcmbDailyKurlarXML(xmlString);
    assert(result !== undefined);
    // console.log('TarihDate:', result.tarihDate);
    // console.log('Currencies:', result.currencies);
    // console.log(
    //   'exchangeRates:',
    //   result.exchangeRates.filter((f) => f.exchange_type === 'TCMB.CR')
    // );
  });
});

var xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="isokur.xsl"?>
<Tarih_Date Tarih="08.07.2024" Date="07/08/2024" Bulten_No="2024/126">
	<Currency CrossOrder="0" Kod="USD" CurrencyCode="USD">
		<Unit>1</Unit>
		<Isim>ABD DOLARI</Isim>
		<CurrencyName>US DOLLAR</CurrencyName>
		<ForexBuying>32.6401</ForexBuying>
		<ForexSelling>32.6989</ForexSelling>
		<BanknoteBuying>32.6172</BanknoteBuying>
		<BanknoteSelling>32.7479</BanknoteSelling>
		<CrossRateUSD/>
		<CrossRateOther/>

	</Currency>
	<Currency CrossOrder="1" Kod="AUD" CurrencyCode="AUD">
		<Unit>1</Unit>
		<Isim>AVUSTRALYA DOLARI</Isim>
		<CurrencyName>AUSTRALIAN DOLLAR</CurrencyName>
		<ForexBuying>21.9482</ForexBuying>
		<ForexSelling>22.0913</ForexSelling>
		<BanknoteBuying>21.8473</BanknoteBuying>
		<BanknoteSelling>22.2239</BanknoteSelling>
		<CrossRateUSD>1.4836</CrossRateUSD>
		<CrossRateOther/>

	</Currency>
	<Currency CrossOrder="2" Kod="DKK" CurrencyCode="DKK">
		<Unit>1</Unit>
		<Isim>DANİMARKA KRONU</Isim>
		<CurrencyName>DANISH KRONE</CurrencyName>
		<ForexBuying>4.7334</ForexBuying>
		<ForexSelling>4.7567</ForexSelling>
		<BanknoteBuying>4.7301</BanknoteBuying>
		<BanknoteSelling>4.7676</BanknoteSelling>
		<CrossRateUSD>6.8850</CrossRateUSD>
		<CrossRateOther/>

	</Currency>
	<Currency CrossOrder="9" Kod="EUR" CurrencyCode="EUR">
		<Unit>1</Unit>
		<Isim>EURO</Isim>
		<CurrencyName>EURO</CurrencyName>
		<ForexBuying>35.3604</ForexBuying>
		<ForexSelling>35.4241</ForexSelling>
		<BanknoteBuying>35.3356</BanknoteBuying>
		<BanknoteSelling>35.4772</BanknoteSelling>
		<CrossRateUSD/>
		<CrossRateOther>1.0833</CrossRateOther>

	</Currency>
	<Currency CrossOrder="10" Kod="GBP" CurrencyCode="GBP">
		<Unit>1</Unit>
		<Isim>İNGİLİZ STERLİNİ</Isim>
		<CurrencyName>POUND STERLING</CurrencyName>
		<ForexBuying>41.7652</ForexBuying>
		<ForexSelling>41.9830</ForexSelling>
		<BanknoteBuying>41.7360</BanknoteBuying>
		<BanknoteSelling>42.0460</BanknoteSelling>
		<CrossRateUSD/>
		<CrossRateOther>1.2818</CrossRateOther>

	</Currency>
	<Currency CrossOrder="3" Kod="CHF" CurrencyCode="CHF">
		<Unit>1</Unit>
		<Isim>İSVİÇRE FRANGI</Isim>
		<CurrencyName>SWISS FRANK</CurrencyName>
		<ForexBuying>36.3675</ForexBuying>
		<ForexSelling>36.6010</ForexSelling>
		<BanknoteBuying>36.3129</BanknoteBuying>
		<BanknoteSelling>36.6559</BanknoteSelling>
		<CrossRateUSD>0.8954</CrossRateUSD>
		<CrossRateOther/>

	</Currency>
	<Currency CrossOrder="4" Kod="SEK" CurrencyCode="SEK">
		<Unit>1</Unit>
		<Isim>İSVEÇ KRONU</Isim>
		<CurrencyName>SWEDISH KRONA</CurrencyName>
		<ForexBuying>3.0952</ForexBuying>
		<ForexSelling>3.1272</ForexSelling>
		<BanknoteBuying>3.0930</BanknoteBuying>
		<BanknoteSelling>3.1344</BanknoteSelling>
		<CrossRateUSD>10.50</CrossRateUSD>
		<CrossRateOther/>

	</Currency>
	<Currency CrossOrder="6" Kod="CAD" CurrencyCode="CAD">
		<Unit>1</Unit>
		<Isim>KANADA DOLARI</Isim>
		<CurrencyName>CANADIAN DOLLAR</CurrencyName>
		<ForexBuying>23.9020</ForexBuying>
		<ForexSelling>24.0098</ForexSelling>
		<BanknoteBuying>23.8136</BanknoteBuying>
		<BanknoteSelling>24.1011</BanknoteSelling>
		<CrossRateUSD>1.3637</CrossRateUSD>
		<CrossRateOther/>

	</Currency>
	<Currency CrossOrder="11" Kod="KWD" CurrencyCode="KWD">
		<Unit>1</Unit>
		<Isim>KUVEYT DİNARI</Isim>
		<CurrencyName>KUWAITI DINAR</CurrencyName>
		<ForexBuying>106.0662</ForexBuying>
		<ForexSelling>107.4541</ForexSelling>
		<BanknoteBuying>104.4752</BanknoteBuying>
		<BanknoteSelling>109.0659</BanknoteSelling>
		<CrossRateUSD/>
		<CrossRateOther>3.2679</CrossRateOther>

	</Currency>
	<Currency CrossOrder="7" Kod="NOK" CurrencyCode="NOK">
		<Unit>1</Unit>
		<Isim>NORVEÇ KRONU</Isim>
		<CurrencyName>NORWEGIAN KRONE</CurrencyName>
		<ForexBuying>3.0796</ForexBuying>
		<ForexSelling>3.1003</ForexSelling>
		<BanknoteBuying>3.0775</BanknoteBuying>
		<BanknoteSelling>3.1074</BanknoteSelling>
		<CrossRateUSD>10.57</CrossRateUSD>
		<CrossRateOther/>

	</Currency>
	<Currency CrossOrder="8" Kod="SAR" CurrencyCode="SAR">
		<Unit>1</Unit>
		<Isim>SUUDİ ARABİSTAN RİYALİ</Isim>
		<CurrencyName>SAUDI RIYAL</CurrencyName>
		<ForexBuying>8.7014</ForexBuying>
		<ForexSelling>8.7171</ForexSelling>
		<BanknoteBuying>8.6362</BanknoteBuying>
		<BanknoteSelling>8.7825</BanknoteSelling>
		<CrossRateUSD>3.7511</CrossRateUSD>
		<CrossRateOther/>

	</Currency>
	<Currency CrossOrder="5" Kod="JPY" CurrencyCode="JPY">
		<Unit>100</Unit>
		<Isim>JAPON YENİ</Isim>
		<CurrencyName>JAPENESE YEN</CurrencyName>
		<ForexBuying>20.2286</ForexBuying>
		<ForexSelling>20.3626</ForexSelling>
		<BanknoteBuying>20.1538</BanknoteBuying>
		<BanknoteSelling>20.4400</BanknoteSelling>
		<CrossRateUSD>160.97</CrossRateUSD>
		<CrossRateOther/>

	</Currency>
	<Currency CrossOrder="12" Kod="BGN" CurrencyCode="BGN">
		<Unit>1</Unit>
		<Isim>BULGAR LEVASI</Isim>
		<CurrencyName>BULGARIAN LEV</CurrencyName>
		<ForexBuying>17.9771</ForexBuying>
		<ForexSelling>18.2124</ForexSelling>
		<BanknoteBuying></BanknoteBuying>
		<BanknoteSelling></BanknoteSelling>
		<CrossRateUSD>1.8055</CrossRateUSD>
		<CrossRateOther/>

	</Currency>
	<Currency CrossOrder="13" Kod="RON" CurrencyCode="RON">
		<Unit>1</Unit>
		<Isim>RUMEN LEYİ</Isim>
		<CurrencyName>NEW LEU</CurrencyName>
		<ForexBuying>7.0671</ForexBuying>
		<ForexSelling>7.1595</ForexSelling>
		<BanknoteBuying></BanknoteBuying>
		<BanknoteSelling></BanknoteSelling>
		<CrossRateUSD>4.5927</CrossRateUSD>
		<CrossRateOther/>

	</Currency>
	<Currency CrossOrder="14" Kod="RUB" CurrencyCode="RUB">
		<Unit>1</Unit>
		<Isim>RUS RUBLESİ</Isim>
		<CurrencyName>RUSSIAN ROUBLE</CurrencyName>
		<ForexBuying>0.36711</ForexBuying>
		<ForexSelling>0.37191</ForexSelling>
		<BanknoteBuying></BanknoteBuying>
		<BanknoteSelling></BanknoteSelling>
		<CrossRateUSD>88.41</CrossRateUSD>
		<CrossRateOther/>

	</Currency>
	<Currency CrossOrder="15" Kod="IRR" CurrencyCode="IRR">
		<Unit>100</Unit>
		<Isim>İRAN RİYALİ</Isim>
		<CurrencyName>IRANIAN RIAL</CurrencyName>
		<ForexBuying>0.00834</ForexBuying>
		<ForexSelling>0.00845</ForexSelling>
		<BanknoteBuying></BanknoteBuying>
		<BanknoteSelling></BanknoteSelling>
		<CrossRateUSD>389020</CrossRateUSD>
		<CrossRateOther/>

	</Currency>
	<Currency CrossOrder="16" Kod="CNY" CurrencyCode="CNY">
		<Unit>1</Unit>
		<Isim>ÇİN YUANI</Isim>
		<CurrencyName>CHINESE RENMINBI</CurrencyName>
		<ForexBuying>4.4646</ForexBuying>
		<ForexSelling>4.5231</ForexSelling>
		<BanknoteBuying></BanknoteBuying>
		<BanknoteSelling></BanknoteSelling>
		<CrossRateUSD>7.2698</CrossRateUSD>
		<CrossRateOther/>

	</Currency>
	<Currency CrossOrder="17" Kod="PKR" CurrencyCode="PKR">
		<Unit>1</Unit>
		<Isim>PAKİSTAN RUPİSİ</Isim>
		<CurrencyName>PAKISTANI RUPEE</CurrencyName>
		<ForexBuying>0.11654</ForexBuying>
		<ForexSelling>0.11807</ForexSelling>
		<BanknoteBuying></BanknoteBuying>
		<BanknoteSelling></BanknoteSelling>
		<CrossRateUSD>278.50</CrossRateUSD>
		<CrossRateOther/>

	</Currency>
	<Currency CrossOrder="18" Kod="QAR" CurrencyCode="QAR">
		<Unit>1</Unit>
		<Isim>KATAR RİYALİ</Isim>
		<CurrencyName>QATARI RIAL</CurrencyName>
		<ForexBuying>8.9007</ForexBuying>
		<ForexSelling>9.0171</ForexSelling>
		<BanknoteBuying></BanknoteBuying>
		<BanknoteSelling></BanknoteSelling>
		<CrossRateUSD>3.6466</CrossRateUSD>
		<CrossRateOther/>

	</Currency>
	<Currency CrossOrder="19" Kod="KRW" CurrencyCode="KRW">
		<Unit>1</Unit>
		<Isim>GÜNEY KORE WONU</Isim>
		<CurrencyName>SOUTH KOREAN WON</CurrencyName>
		<ForexBuying>0.02345</ForexBuying>
		<ForexSelling>0.02376</ForexSelling>
		<BanknoteBuying></BanknoteBuying>
		<BanknoteSelling></BanknoteSelling>
		<CrossRateUSD>1384</CrossRateUSD>
		<CrossRateOther/>

	</Currency>
	<Currency CrossOrder="20" Kod="AZN" CurrencyCode="AZN">
		<Unit>1</Unit>
		<Isim>AZERBAYCAN YENİ MANATI</Isim>
		<CurrencyName>AZERBAIJANI NEW MANAT</CurrencyName>
		<ForexBuying>19.0924</ForexBuying>
		<ForexSelling>19.3423</ForexSelling>
		<BanknoteBuying></BanknoteBuying>
		<BanknoteSelling></BanknoteSelling>
		<CrossRateUSD>1.7000</CrossRateUSD>
		<CrossRateOther/>

	</Currency>
	<Currency CrossOrder="21" Kod="AED" CurrencyCode="AED">
		<Unit>1</Unit>
		<Isim>BİRLEŞİK ARAP EMİRLİKLERİ DİRHEMİ</Isim>
		<CurrencyName>UNITED ARAB EMIRATES DIRHAM</CurrencyName>
		<ForexBuying>8.8367</ForexBuying>
		<ForexSelling>8.9523</ForexSelling>
		<BanknoteBuying></BanknoteBuying>
		<BanknoteSelling></BanknoteSelling>
		<CrossRateUSD>3.6730</CrossRateUSD>
		<CrossRateOther/>

	</Currency>
	<Currency CrossOrder="0" Kod="XDR" CurrencyCode="XDR">
		<Unit>1</Unit>
		<Isim>ÖZEL ÇEKME HAKKI (SDR)                            </Isim>
		<CurrencyName>SPECIAL DRAWING RIGHT (SDR)                       </CurrencyName>
		<ForexBuying>43.1731</ForexBuying>
		<ForexSelling/>
		<BanknoteBuying/>
		<BanknoteSelling/>
		<CrossRateUSD/>
		<CrossRateOther>1.32151</CrossRateOther>
	</Currency>
</Tarih_Date>`;
