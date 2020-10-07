import * as types from '../constants/types';
import { AppThunk } from '../store';
// import { UPDATE_COLUMNS } from '../constants/actionTypes';
import _ from 'lodash';

export const updateColumns = (
  source: any[],
  destination: any[],
  sourceIdx: number,
  destinationIdx: number,
  destinationName: string
): AppThunk => async (dispatch) => {
  // update columns for dnd
  const sourceCopy = _.cloneDeep(source);
  const destinationCopy = _.cloneDeep(destination);

  // function that removes card from original column and rearranges affected elements
  const removeCard = (arr: types.IJobs[], index: number) => {
    for (let i = index; i < arr.length - 1; i++) {
      arr[i] = arr[i + 1];
    }
    arr.pop();
    console.log('removeCardFunc', arr);
    return arr;
  };

  // function that inserts card into new column and rearranges affected elements
  const insertCard = (arr: types.IJobs[], index: number, obj: types.IJobs) => {
    console.log('index', index);
    obj.list_order = index;
    obj.status = destinationName;
    let temp = arr[index];
    arr[index] = obj;
    for (let i = index + 1; i < arr.length; i++) {
      let currElem = arr[i];
      arr[i] = temp;
      temp = currElem;
    }
    if (temp !== undefined) arr.push(temp);
    return arr;
  };

  const jobCard = sourceCopy[sourceIdx];
  console.log('job card', jobCard);
  removeCard(sourceCopy, sourceIdx);
  insertCard(destinationCopy, destinationIdx, jobCard);

  // should now have updated columns array
  console.log('sourceCopy', sourceCopy);
  //! index is buggy?
  console.log('dest copy', destinationCopy);

  // send both columns to the back end and update list orders

  const query = `mutation UpdateColumns($sourceCopy: [JobInput], $destinationCopy: [JobInput]) {
    updateColumns(column1: $sourceCopy, column2: $destinationCopy) {
      allJobs {
        _id
        status
        company
        title
        location
        salary
        url
        notes
        list_order
      }
    }
  }`;

  fetch('/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables: { sourceCopy, destinationCopy },
    }),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('updated columns', data);
    })
    .catch((err) => {
      console.log('err in update columns action', err);
    });
};
