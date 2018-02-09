import {diffWordsWithSpace} from 'diff';

const diff = (oldString, newString) => {
    const bareDiff = diffWordsWithSpace(
        oldString,
        newString,
        {
        ignoreCase: true,
        }
    );

    return bareDiff
}

export default diff;
