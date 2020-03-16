export class Organizations {
    private static companyName: string;

    static shouldNotBeAbleToSaveNewCompany() {
        cy.get('.submit-btn > .btn').should('be.disabled');
    }

    static shouldIncludeNewCompany() {
        cy.get('kros-company-item > .company-grid > .name').should('contain', this.companyName);
    }

    static shouldSetCompanyAsDefault() {
        cy.get('kros-company-item > .company-grid > .name').should('not.contain', this.companyName);
    }

    static typeInNewCompanyFields(companyName: string, bussinesId: string) {
        this.companyName = companyName;
        cy.get('.name > .col').type(companyName);
        cy.get('.organizationId > .col').type(bussinesId);
    }

    static typeInAnotherCompanyFields(companyName: string, street: string) {
        this.companyName = companyName;
        cy.get('.name > .col').type(companyName);
        cy.get('.street > .col').type(street);
    }

    static clickAdd() {
        cy.get('.btn-outline-success').click();
    }
    
    static clickSave() {
        cy.get('.submit-btn > .btn').click();
    }
}