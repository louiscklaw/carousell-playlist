const view_ports = [
  'ipad-2',
  'ipad-mini',
  'iphone-3',
  'iphone-4',
  'iphone-5',
  'iphone-6',
  'iphone-6+',
  'iphone-7',
  'iphone-8',
  'iphone-x',
  'iphone-xr',
  'iphone-se2',
  'macbook-11',
  'macbook-13',
  'macbook-15',
  'macbook-16',
  'samsung-note9',
  'samsung-s10',
];

const orientations = ['portrait', 'landscape'];

describe('viewports', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });

  it('test viewport and orientation', () => {
    for (let i = 0; i < view_ports.length; i++) {
      let view_port = view_ports[i];
      for (let ii = 0; ii < orientations.length; ii++) {
        let orientation = orientations[ii];

        cy.viewport(view_port, orientation);
        cy.visit('http://www.example.com/');

        cy.get('body > div > h1').should('have.text', 'Example Domain');

        cy.screenshot();
      }
    }
  });
});
