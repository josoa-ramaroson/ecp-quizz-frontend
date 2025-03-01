
import { EErrorMessage, ELocalStorageKey } from '@/enums';
import { ITokenState } from '@/interfaces';
import { useTokenStore } from '@/store';
import axios from 'axios';
import { LocalStorageService } from './localstorage';

// Créez une instance Axios avec des configurations par défaut
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WINEDGE_API_URL, // URL de base de votre API
  headers: {
    'Content-Type': 'application/json', // Type de contenu par défaut
  },
});

// Add a request interceptor
api.interceptors.request.use(async (config) => {
  
  const { accessToken } = useTokenStore.getState() as ITokenState;

  if (accessToken) 
    config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
}, (error) => {
  // Handle request error
  throw error;
});


// Intercepteur pour gérer les réponses
api.interceptors.response.use(
  response => {
    // Traitez la réponse ici si nécessaire
    return response;
  },
  error => {
    if (!error.response) 
      // Handle no response from server
      throw new Error(EErrorMessage.NO_RESPONSE_FROM_SERVER_ERROR);
    
    const { status, data } = error.response;
    let errorMessage = data?.message  || EErrorMessage.UNKOWN_ERROR;

    switch(status) {
      case 400:
        errorMessage = EErrorMessage.BAD_REQUEST_ERROR;
        break;
      
      case 401:
        useTokenStore.getState().clearAccessToken();
        LocalStorageService.clear();
        errorMessage = EErrorMessage.UNAUTHORIZED_ERROR;
        break;
        
      case 403:
        errorMessage = EErrorMessage.FORBIDDEN_ERROR;
        break;
      
      case 404:
        errorMessage = EErrorMessage.NOT_FOUND_ERROR;
        break;

      case 500:
        errorMessage = EErrorMessage.INTERNAL_SERVER_ERROR;
        break;
    }

    throw new Error(errorMessage);
  }  
);



export { api };