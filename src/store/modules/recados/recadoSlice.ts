import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { Recado } from '../typeStore';

const adapter = createEntityAdapter<Recado>({
  selectId: (item) => item.id,
});

export const { selectAll: buscarRecados, selectById:buscarRecadosPorId } = adapter.getSelectors(
  (state: RootState) => state.recados
);

const recadosSlice = createSlice({
  name: 'recados',
  initialState: adapter.getInitialState(),
  reducers: {
    adicionarNovoRecado: adapter.addOne,
    adicionarRecados: adapter.addMany,
    atualizarRecado: adapter.updateOne,
    deletarRecado: adapter.removeOne,
    limparRecados: adapter.removeAll
  },
});

export const { adicionarNovoRecado, adicionarRecados, atualizarRecado, deletarRecado, limparRecados} = recadosSlice.actions;
export const recadosReducer =  recadosSlice.reducer;