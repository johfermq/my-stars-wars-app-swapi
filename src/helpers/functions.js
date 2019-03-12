import to from 'await-to-js';

import apiService from './../services/api.service';

/**
 * Convierte el texto a mayuscula inicial
 * @param  {string} string
 * @return {string}
 */
export function capitalize (string) {
	return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

/**
 * Convierte el texto a mayusculas
 * @param  {string} string
 * @return {string}
 */
export function uppercase (string) {
	return string.toUpperCase();
}

/**
 * Obtiene el id del una url
 * @param  {string} url
 * @param  {string} endpoint
 * @return {string}
 */
export function splitId (url, endpoint) {
	return url.substring(21 + endpoint.length).split('/')[1];
}

/**
 * Obtiene el numero de páginas del recurso
 * @param  {number} count
 * @param  {number} rowsPerPage
 * @return {number}
 */
export function numberOfPages (count, rowsPerPage) {
	return Math.ceil(count / rowsPerPage);
}

/**
 * Obtiene el nombre o titulo de un item del estado
 * @param  {string} endpoint
 * @param  {string} url
 * @param  {string} field
 * @return {string}
 */
export function takeNameOrTitle (items, url, field) {
	let found = items.find(item => item.url.includes(url));

	return found ? (field === 'name' ? found.name : found.title) : '';
}

/**
 * Extrae los datos del recurso (api)
 * @param  {string} endpoint
 * @param  {number} rowsPerPage
 * @return {array}
 */
export async function extractData (endpoint, rowsPerPage) {

	let items = [];

	let response = await to(apiService.all(endpoint));

	await items.push(...response[1].data.results);

    const totalPages = await numberOfPages(response[1].data.count, rowsPerPage);

    if (totalPages > 1)
    {
        for (let page = 2; page <= totalPages; page++)
        {
        	let responsePage = await to(apiService.all(endpoint, page));
        	await items.push(...responsePage[1].data.results);
        }
    }

    return items;
}