import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';




export default function Editor(props) {
    return (
        <AceEditor
    mode="java"
    theme="github"
    onChange={onChange}
    name="UNIQUE_ID_OF_DIV"
    editorProps={{ $blockScrolling: true }}
  />
    );
};