// 3D%20代客打印

let keywords = [
  '3D打印',
  '3D代客打印',
  // '3D檔案打印',
  // '3D代印',
  // '3D打印機',
  // 'FDM代印',
  // '3D print',
  // '3D printing',
  // 'STL',
  // '3mf',
  // 'step',
  // 'thingiverse',
  // 'cults3d',
  // '繪圖服務',
  // '繪圖委托',
  // '打印委托',
  // 'FDM/ABS/TPU/PLA/PETG/PLA+/改圖',
  // '誠接打印',
  // '3D 代客打印',
  // '3D代打印服務',
  // '3D PLA',
  // '3D ABS',
  // '3D PETG',
  // '3D TPU',
];

describe('search by main keywords - my name should appears in the first 8 cards', () => {
  keywords.forEach(keyword => {
    it(`testing search by ${keyword}`, () => {
      cy.visit('https://www.carousell.com.hk');

      cy.xpath('(.//input[@placeholder="Search for an item"])[1]').type(keyword);

      cy.xpath('(.//button[@data-testid="navbar-search-input-location-desktop-btn-search"])[1]').click();
      cy.wait(5000);

      let found_position = 99;
      cy.xpath(`(.//*[@data-testid="listing-card-text-seller-name"])`).each(($ele, index) => {
        if ($ele.text().search(/louiscklaw/) > -1) {
          found_position = index;
          expect(index).to.be.lessThan(8, `keyword search failed for ${keyword}, found position ${found_position}`);
        }
      });

      cy.window().then(win => {
        win.document.querySelector('#root > div > div.D_alW.D_ama').style.display = 'none';
      });

      cy.xpath('.//main').screenshot(`3d_printing_service/${keyword}`);

      cy.debug({ keyword, found_position });
    });
  });
});