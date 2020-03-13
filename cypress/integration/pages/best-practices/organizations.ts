export class Organizations {

    private static companyName: string;
    private static companyRowIds: number[];

    static shouldContainCompanyInList(comapnyName: string) {
        cy.get('kros-company-item > .company-grid > .name').each((element, index) => {
            //ak sa zhoduju nazvy, zarad ho na vymazanie
            if (element) {

                //assert pre zabezpečenie výstupu
                element.should('contain', comapnyName);
            }
        });
    }

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

    static clickRemove() {
        this.companyRowIds.forEach((index) => {
            cy.get(':nth-child(' + index + ') > kros-company-item > ' +
            '.company-grid > .actions > .btn-outline-danger').click();
        });
    }
}