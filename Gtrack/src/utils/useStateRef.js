import React, { useState, useRef } from 'react'

function useStateRef(defaultValue) {
    var [state, setState] = useState(defaultValue)
	var ref = useRef(defaultValue)
	ref.current = state
	return [
		state,
		function (newValue) {
			ref.current = newValue
			return setState(newValue)
		},
		ref
	]
}

export default useStateRef