const cds = require('@sap/cds')
cds.env.features.fetch_csrf = true

module.exports = cds.service.impl(async function () {
    const { BusinessPartner } = this.entities
    const service = await cds.connect.to('BusinessPartner');

    this.on('READ', BusinessPartner, req => {
        return service.tx(req).run(req.query);
    });

    this.on('POST', 'BusinessPartner', async (req) => {
        console.log(req.data.BusinessPartnerCategory)
        console.log(req.data.OrganizationBPName1)
        const tx = service.tx(req)   
        //const data = { "BusinessPartnerCategory": "2", "OrganizationBPName1": "Test123450" }
        const data = { "BusinessPartnerCategory": req.data.BusinessPartnerCategory, "OrganizationBPName1": req.data.OrganizationBPName1 }
        //const headers = { "Content-Type": "application/json" }
        var result = await tx.send({ method: 'POST', path: 'A_BusinessPartner', data })
        return result
        
        /*await service.send({
            method: 'POST',
            path: 'A_BusinessPartner',
            data: {
                BusinessPartnerCategory: 2,
                OrganizationBPName1: "Test12345"
            }
        })*/
    });

    this.on('DELETE', 'BusinessPartner', async(req) => {
        const tx = service.tx(req)   
        //const data = { "BusinessPartnerCategory": "2", "OrganizationBPName1": "Test123450" }
        //const headers = { "Content-Type": "application/json" }
        var result = await tx.send({ method: 'DELETE', path: 'A_BusinessPartner' })
        return result
    })
})

