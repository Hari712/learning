import React, { useEffect } from 'react';
import CodePush from 'react-native-code-push';

const CODE_PUSH_OPTIONS = {
	checkFrequency: CodePush.CheckFrequency.ON_APP_START,
};

const withCodePush = WrappedComponent => {
	function WrappedApp() {
		useEffect(() => {
			CodePush.sync({ installMode: CodePush.InstallMode.IMMEDIATE }, syncWithCodePushStatus, null);
		}, []);

		function syncWithCodePushStatus(status) {
			console.log(status);
		}

		return <WrappedComponent />;
	}
	return CodePush(CODE_PUSH_OPTIONS)(WrappedApp);
};

export default withCodePush;
