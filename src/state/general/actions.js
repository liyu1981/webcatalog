import {
  UPDATE_IS_DARK_MODE,
  UPDATE_IS_FULL_SCREEN,
  UPDATE_LATEST_TEMPLATE_VERSION,
} from '../../constants/actions';

export const updateIsFullScreen = isFullScreen => ({
  type: UPDATE_IS_FULL_SCREEN,
  isFullScreen,
});

export const updateIsDarkMode = isDarkMode => ({
  type: UPDATE_IS_DARK_MODE,
  isDarkMode,
});

export const updateLatestTemplateVersion = latestTemplateVersion => ({
  type: UPDATE_LATEST_TEMPLATE_VERSION,
  latestTemplateVersion,
});
