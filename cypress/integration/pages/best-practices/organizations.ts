export class Organizations {
    
    private static companyName: string;
    
    static shouldIncludeNewCompany() {
        cy.get('kros-company-item > .company-grid > .name').should('contain', this.companyName);
    }
    static typeInNewCompanyFields(companyName: string, bussinesId: string) {
        this.companyName = companyName;
        cy.get('.name > .col').type(companyName);
        cy.get('.organizationId > .col').type(bussinesId);
    }
    static clickAdd() {
        cy.get('.btn-outline-success').click();
    }
    static clickSave() {
        cy.get('.submit-btn > .btn').click();
    }


}