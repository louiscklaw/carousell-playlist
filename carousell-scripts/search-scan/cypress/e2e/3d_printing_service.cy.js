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
      cy.debug(keyword);
      cy.visit('https://www.carousell.com.hk');

      cy.xpath('(.//input[@placeholder="Search for an item"])[1]').type(keyword);

      cy.xpath('(.//button[@data-testid="navbar-search-input-location-desktop-btn-search"])[1]').click();
      cy.wait(5000);

      cy.xpath(`(.//*[@data-testid="listing-card-text-seller-name"])`).contains('louiscklaw');

      cy.screenshot();
    });
  });
});
