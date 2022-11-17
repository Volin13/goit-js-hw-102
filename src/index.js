import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import countryMarkup from '././templates/countryMarkup.hbs';
import countryList from '././templates/countryList.hbs';

const inputElem = document.querySelector('#search-box');
const countryListElem = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

function handleInput(e) {
  const inputValue = e.target.value.trim();
  if (!inputValue) {
    countryListElem.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }
  fetchCountries(inputValue)
    .then(data => {
      renderMarkup(data);
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      countryInfo.innerHTML = '';
      countryListElem.innerHTML = '';
    });
}

function renderMarkup(countries) {
    console.log(countries);
  if (countries.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
  if (countries.length > 2 && countries.length < 10) {
    countryInfo.innerHTML = '';
    countryListElem.innerHTML = countryList(countries);
  }
  if (countries.length === 1) {
    const searchData = countries[0];
    countryListElem.innerHTML = '';
    searchData.lang = Object.values(searchData.languages).join(', ');
    countryInfo.innerHTML = countryMarkup(searchData);
    console.log(searchData);

    return;
  }
}

inputElem.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));
