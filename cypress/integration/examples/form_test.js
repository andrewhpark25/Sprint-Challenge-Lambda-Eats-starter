describe("Testing pizza form", function() {
    beforeEach(function() {
      cy.visit("http://localhost:3000/Pizza");
    });
    it("Add test to inputs and submit form", function() {
   
      cy.get('input[name="name"]').type("Andrew").should("have.value", "Andrew");
      cy.get("#size").select("Small").should("have.value", "Small");
      cy.get('[type="checkbox"]').check(['Cheese'])
      cy.get("button").click();
    });
    
  });