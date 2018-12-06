import fetch from 'isomorphic-fetch';

export function searchParts(apiUrl) {
  return fetch(apiUrl).then(function(response) {
    if (response.ok) {
      return response.json();
    } else {
      return { status: 500, statusText: 'Internal Server Error' };
    }
  });
}

export function updateParts(apiUrl = ``) {
  return fetch(apiUrl, {
    method: 'PUT'
  }).then(function(response) {
    if (response.ok){
      return {
        status: response.status,
        statusText: response.statusText
      };
    } else {
      return { status: 500, statusText: 'Internal Server Error' };
    }
  });
}

export function createParts(apiUrl = ``) {
  return fetch(apiUrl, {
    method: 'POST'
  }).then(function(response) {
    if (response.ok){
      return {
        status: response.status,
        statusText: response.statusText
      };
    } else {
      return { status: 500, statusText: 'Internal Server Error' };
    }
  });
}

export function getAllBrands(apiUrl) {
  return fetch(apiUrl).then(function(response) {
    if (response.ok) {
      return response.json();
    } else {
      return { status: 500, statusText: 'Internal Server Error' };
    }
  });
}

export function getAllSuppliers(apiUrl) {
  return fetch(apiUrl).then(function(response){
    if (response.ok){
      return response.json();
    } else {
      return { status: 500, statusText: 'Internal Server Error' };
    }
  });
}
