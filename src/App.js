import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol, ModalRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';

const App = () => {
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [modal, setModal] = useState(null);
	const [modalError, setModalError] = useState([]);
	const [modalsList, setModalsList] = useState(null);
	const [animate, setAnimate] = useState(false);

	const panels = Home({ setPopout ,setModalError, setModal, setModalsList, setAnimate })

	const modalsView = (
		<ModalRoot activeModal={modal}>
			{modalError}
			{modalsList}
		</ModalRoot>
	);

	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout popout={popout} modal={modalsView}>
						<SplitCol animate={animate}>
							{panels}
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
