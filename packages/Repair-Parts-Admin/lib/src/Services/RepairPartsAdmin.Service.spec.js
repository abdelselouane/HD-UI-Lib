import { searchParts, updateParts, createParts, getAllBrands, getAllSuppliers } from './RepairPartsAdmin.Service';
import toJson from 'enzyme-to-json';
import nock from 'nock';

describe('partsServices', () => {

  it('"searchParts" should return an array of objects on success', async () => {
    nock('https://partsservice-dev.apps-np.homedepot.com')
      .get('/partsservice/v1/parts/supplier/123')
      .reply(200, function(){ 
        return [{
          partNbr: '1234'
        }];
      });
    const url = 'https://partsservice-dev.apps-np.homedepot.com/partsservice/v1/parts/supplier/123';
    const search = await searchParts(url);
    expect(search).toEqual([{
      partNbr: '1234'
    }]);
  });

  it('"searchParts" should return 500 status on failure', async () => {
    nock('https://partsservice-dev.apps-np.homedepot.com')
      .get('/partsservice/v1/parts/supplier/123')
      .reply(500, function(){ 
        return { status: 500, statusText: 'Internal Server Error' };
      });
    const url = 'https://partsservice-dev.apps-np.homedepot.com/partsservice/v1/parts/supplier/123';
    const search = await searchParts(url);
    expect(search).toEqual({ status: 500, statusText: 'Internal Server Error' });
  });

  it('"updatePart" should return success status', async () => {
    nock('https://partsservice-dev.apps-np.homedepot.com')
      .put('/partsservice/v1/parts/supplier')
      .query(true)
      .reply(200, function(){ 
        return { status: 200, statusText: "OK" };
      });
    const params = `?brandNbr=123&cost=12&partNbr=123&supplierNbr=23&userId=userID`;
    const url = `https://partsservice-dev.apps-np.homedepot.com/partsservice/v1/parts/supplier${params}`;
    const response = await updateParts(url);
    expect(response).toEqual({ status: 200, statusText: "OK" });
  });

  it('"updatePart" should return 500 status on failure', async () => {
    nock('https://partsservice-dev.apps-np.homedepot.com')
      .put('/partsservice/v1/parts/supplier')
      .query(true)
      .reply(500, function(){ 
        return { status: 500, statusText: 'Internal Server Error' };
      });
    const params = `?brandNbr=123&cost=12&partNbr=123&supplierNbr=23&userId=userID`;
    const url = `https://partsservice-dev.apps-np.homedepot.com/partsservice/v1/parts/supplier${params}`;
    const response = await updateParts(url);
    expect(response).toEqual({ status: 500, statusText: 'Internal Server Error' });
  });

  it('"createParts" should return success status', async () => {
    nock('https://partsservice-dev.apps-np.homedepot.com')
      .post('/partsservice/v1/parts/supplier')
      .query(true)
      .reply(200, function(){ 
        return { status: 200, statusText: "OK" };
      });
    const params = `?brandNbr=1234&cost=12&partDesc=test123&partNbr=1234&supplierNbr=29&userId=admin`;
    const url = `https://partsservice-dev.apps-np.homedepot.com/partsservice/v1/parts/supplier${params}`;
    const response = await createParts(url);
    expect(response).toEqual({ status: 200, statusText: "OK" });
  });

  it('"createParts" should return 500 status on failure', async () => {
    nock('https://partsservice-dev.apps-np.homedepot.com')
      .post('/partsservice/v1/parts/supplier')
      .query(true)
      .reply(500, function(){ 
        return { status: 500, statusText: 'Internal Server Error' };
      });
    const params = `?brandNbr=123&cost=12&partNbr=123&supplierNbr=23&userId=userID`;
    const url = `https://partsservice-dev.apps-np.homedepot.com/partsservice/v1/parts/supplier${params}`;
    const response = await createParts(url);
    expect(response).toEqual({ status: 500, statusText: 'Internal Server Error' });
  });

  it('"getAllBrands" should return an array of objects on success', async () => {
    nock('https://partsservice-dev.apps-np.homedepot.com')
      .get('/partsservice/v1/brands')
      .reply(200, function(){ 
        return [{
          brandNbr: '1234'
        }];
      });
    const url = 'https://partsservice-dev.apps-np.homedepot.com/partsservice/v1/brands';
    const allBrands = await getAllBrands(url);
    expect(allBrands).toEqual([{
      brandNbr: '1234'
    }]);
  });

  it('"getAllBrands" should return 500 status on failure', async () => {
    nock('https://partsservice-dev.apps-np.homedepot.com')
      .get('/partsservice/v1/brands')
      .reply(500, function(){
        return { status: 500, statusText: 'Internal Server Error' };
      });
    const url = 'https://partsservice-dev.apps-np.homedepot.com/partsservice/v1/brands';
    const allBrands = await getAllBrands(url);
    expect(allBrands).toEqual({ status: 500, statusText: 'Internal Server Error' });
  });

  it('"getAllSuppliers" should return an array of objects on success', async () => {
    nock('https://partsservice-dev.apps-np.homedepot.com')
      .get('/partsservice/v1/suppliers')
      .reply(200, function(){ 
        return [{
          supplierNbr: '1234'
        }];
      });
    const url = 'https://partsservice-dev.apps-np.homedepot.com/partsservice/v1/suppliers';
    const allSuppliers = await getAllSuppliers(url);
    expect(allSuppliers).toEqual([{
      supplierNbr: '1234'
    }]);
  });

  it('"getAllSuppliers" should return 500 status on failure', async () => {
    nock('https://partsservice-dev.apps-np.homedepot.com')
      .get('/partsservice/v1/suppliers')
      .reply(500, function(){
        return { status: 500, statusText: 'Internal Server Error' };
      });
    const url = 'https://partsservice-dev.apps-np.homedepot.com/partsservice/v1/suppliers';
    const allSuppliers = await getAllSuppliers(url);
    expect(allSuppliers).toEqual({ status: 500, statusText: 'Internal Server Error' });
  });

});