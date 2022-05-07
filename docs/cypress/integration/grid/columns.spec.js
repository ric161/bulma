import { setMobile, setTablet, setDesktop } from "../utils";

const WIDTHS = [
  ["three-quarters", 0.75],
  ["two-thirds", 0.6666],
  ["half", 0.5],
  ["one-third", 0.3333],
  ["one-quarter", 0.25],
  ["one-fifth", 0.2],
  ["two-fifths", 0.4],
  ["three-fifths", 0.6],
  ["four-fifths", 0.8],
];

// const OFFSETS = [
//   ["offset-three-quarters", 0.75],
//   ["offset-two-thirds", 0.6666],
//   ["offset-half", 0.5],
//   ["offset-one-third", 0.3333],
//   ["offset-one-quarter", 0.25],
//   ["offset-one-fifth", 0.2],
//   ["offset-two-fifths", 0.4],
//   ["offset-three-fifths", 0.6],
//   ["offset-four-fifths", 0.8],
// ];

// describe("Grid/Columns", () => {
//   beforeEach(() => {
//     cy.visit("http://127.0.0.1:4000/cyp/grid/columns/");
//     setDesktop();
//   });

//   it("has Columns", () => {
//     cy.get(".columns").should("exist");
//   });

//   it("has correct Columns", () => {
//     cy.get("#columns").then(($) => {
//       const cs = window.getComputedStyle($[0]);
//       expect(cs.display).to.equal("flex");
//       expect(cs.marginBottom).to.equal("12px");
//       expect(cs.marginLeft).to.equal("-12px");
//       expect(cs.marginRight).to.equal("-12px");
//       expect(cs.marginTop).to.equal("-12px");
//     });
//   });

//   it("has correct last Columns", () => {
//     cy.get("#columns-last").then(($) => {
//       const cs = window.getComputedStyle($[0]);
//       expect(cs.marginBottom).to.equal("-12px");
//     });
//   });

//   it("has correct centered Columns", () => {
//     cy.get("#columns-centered").then(($) => {
//       const cs = window.getComputedStyle($[0]);
//       expect(cs.justifyContent).to.equal("center");
//     });
//   });

//   it("has correct gapless Columns", () => {
//     cy.get("#columns-gapless").then(($) => {
//       const cs = window.getComputedStyle($[0]);
//       expect(cs.marginBottom).to.equal("24px");
//       expect(cs.marginLeft).to.equal("0px");
//       expect(cs.marginRight).to.equal("0px");
//       expect(cs.marginTop).to.equal("0px");
//     });

//     cy.get("#columns-gapless .column").then(($) => {
//       const cs = window.getComputedStyle($[0]);
//       expect(cs.margin).to.equal("0px");
//       expect(cs.padding).to.equal("0px");
//     });
//   });

//   it("has correct gapless last Columns", () => {
//     cy.get("#columns-gapless-last").then(($) => {
//       const cs = window.getComputedStyle($[0]);
//       expect(cs.marginBottom).to.equal("0px");
//     });
//   });

//   it("has correct multiline Columns", () => {
//     cy.get("#columns-multiline").then(($) => {
//       const cs = window.getComputedStyle($[0]);
//       expect(cs.flexWrap).to.equal("wrap");
//     });
//   });

//   it("has correct vcentered Columns", () => {
//     cy.get("#columns-vcentered").then(($) => {
//       const cs = window.getComputedStyle($[0]);
//       expect(cs.alignItems).to.equal("center");
//     });
//   });

//   // Responsiveness

//   it("has correct mobile Columns", () => {
//     setMobile();

//     cy.get("#columns-mobile").then(($) => {
//       const cs = window.getComputedStyle($[0]);
//       expect(cs.display).to.equal("flex");
//     });

//     setDesktop();

//     cy.get("#columns-mobile").then(($) => {
//       const cs = window.getComputedStyle($[0]);
//       expect(cs.display).to.equal("flex");
//     });
//   });

//   it("has correct desktop Columns", () => {
//     setMobile();

//     cy.get("#columns-desktop").then(($) => {
//       const cs = window.getComputedStyle($[0]);
//       expect(cs.display).to.equal("block");
//     });

//     setTablet();

//     cy.get("#columns-desktop").then(($) => {
//       const cs = window.getComputedStyle($[0]);
//       expect(cs.display).to.equal("block");
//     });

//     setDesktop();

//     cy.get("#columns-desktop").then(($) => {
//       const cs = window.getComputedStyle($[0]);
//       expect(cs.display).to.equal("flex");
//     });
//   });
// });

describe("Grid/Column", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:4000/cyp/grid/columns/");
    setTablet();
  });

  it("has a Column", () => {
    cy.get(".column").should("exist");
  });

  it("has a correct Column", () => {
    cy.get("#columns .column").then(($) => {
      const cs = window.getComputedStyle($[0]);
      expect(cs.display).to.equal("block");
      expect(cs.flexBasis).to.equal("0px");
      expect(cs.flexGrow).to.equal("1");
      expect(cs.flexShrink).to.equal("1");
      expect(cs.padding).to.equal("12px");
    });
  });

  it("has a correct Column sizes", () => {
    cy.get(`#columns-special`).then(($) => {
      const columnsWidth = $[0].clientWidth;

      const $full = $.find(`.column.is-full`);
      const csfull = window.getComputedStyle($full[0]);
      const actualFullWidth = csfull.width.substring(
        0,
        csfull.width.length - 2
      );
      expect(csfull.flexBasis).to.equal("auto");
      expect(csfull.flexGrow).to.equal("0");
      expect(csfull.flexShrink).to.equal("0");
      expect(`${Math.round(actualFullWidth)}px`).to.equal(
        `${Math.round(columnsWidth)}px`
      );

      const $narrow = $.find(`.column.is-narrow`);
      const csnarrow = window.getComputedStyle($narrow[0]);
      expect(csnarrow.flexBasis).to.equal("auto");
      expect(csnarrow.flexGrow).to.equal("0");
      expect(csnarrow.flexShrink).to.equal("0");

      WIDTHS.forEach((width) => {
        const name = width[0];
        const factor = width[1];

        const $1 = $.find(`.column.is-${name}`);
        const cs1 = window.getComputedStyle($1[0]);
        const actualWidth = cs1.width.substring(0, cs1.width.length - 2);
        expect(cs1.flexBasis).to.equal("auto");
        expect(cs1.flexGrow).to.equal("0");
        expect(cs1.flexShrink).to.equal("0");
        expect(`${Math.round(actualWidth)}px`).to.equal(
          `${Math.round(factor * columnsWidth)}px`
        );

        const $2 = $.find(`.column.is-offset-${name}`);
        const cs = window.getComputedStyle($2[0]);
        const actualMarginLeft = cs.marginLeft.substring(
          0,
          cs.marginLeft.length - 2
        );
        expect(`${Math.round(actualMarginLeft)}px`).to.equal(
          `${Math.round(factor * columnsWidth)}px`
        );
      });
    });
  });
});
