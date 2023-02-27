import { StatusBar } from 'expo-status-bar';
import { styled, useColorScheme } from 'nativewind';
import { useRef, useState } from 'react';
import { SafeAreaView, ScrollView as scview, StyleSheet, Text as text, TextInput as input, TouchableOpacity, } from 'react-native';
import { View as view } from 'react-native'
const View = styled(view)
const Input = styled(input)
const Text = styled(text)
const ScrollView = styled(scview)

interface NoteType { name: string, desc: string, date: Date }
export default function App() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme()
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [open, setOpen] = useState<NoteType | null>(null)
  const [note, setNote] = useState<string>('')
  const [desc, setDesc] = useState<string>('')
  const [error, setError] = useState<string>('')
  const inputref = useRef()
  const addNote = () => {
    if (!note.trim().length) {
      setError('Note "Title" is required');
      return
    }
    if (!desc.trim().length) {
      setError('Note "Description" is required');
      return
    }
    setNotes([...notes, { name: note, desc, date: new Date() }]);
    setNote('');
    setDesc('');
    setError('')
  }

  const deleteNote = (note: string) =>
    setNotes(notes.filter(n => n.name !== note))
  return (
    <View className='h-screen flex-1 bg-slate-100 dark:bg-slate-900 relative'>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      {
        !!open ?
          <View className='bg-slate-900/80 z-10 absolute items-center justify-center inset-0 h-screen'>
            <View className='w-11/12 mx-auto rounded-md my-auto p-6 bg-slate-700'>
              <TouchableOpacity onPress={() => setOpen(null)} style={{ padding: 4 }}>
                <Text className='p-2 text-3xl absolute -top-5 -right-4 text-red-600'>
                  &times;
                </Text>
              </TouchableOpacity>
              <Text className='text-slate-800 dark:text-slate-100 text-xl'>
                {open?.name || "No title"}
              </Text>
              <Text className='text-slate-800 dark:text-slate-300 text-sm '>
                {open?.date.toLocaleString('en-us', { dateStyle: 'medium' }) || 'Invalid date'}
              </Text>
              <Text className='text-slate-800 dark:text-slate-200 pt-4 text-[16px]'>
                {open?.desc}
              </Text>
              <Text className='text-slate-800 dark:text-slate-400 mt-auto ml-auto text-sm pt-5'>
                By Sanket Gawande
              </Text>
            </View>
          </View>
          : null
      }
      <SafeAreaView style={{ marginTop: 40 }}>
        <View className='py-4 flex-row justify-between'>
          <Text className='text-slate-500 mt-auto pl-4'>
            By Sanket Gawande
          </Text>
          <TouchableOpacity>
            <Text onPress={toggleColorScheme} className='bg-slate-800 w-20 px-4 py-3 ml-auto mr-6 text-center rounded-md text-slate-300'>
              {colorScheme === 'light' ? 'Dark' : 'Light'}
            </Text>
          </TouchableOpacity>
        </View>
        <View className='p-4 bg-slate-300 dark:bg-slate-800 py-12 w-11/12 mx-auto rounded-md mt-8'>
          <View className='flex space-y-4'>
            {error
              ? <Text className='bg-red-500/20 text-red-500 py-3 px-4 rounded-md'>
                {error}
              </Text>
              : null
            }
            <Text className='text-slate-800 dark:text-slate-100'>
              Title
            </Text>
            <Input value={note} onChangeText={(text) => setNote(text)} className='rounded-md  px-6 font-semibold text-sm text-slate-700  dark:text-slate-100 dark:border-slate-200   py-2 border' />
            <Text className='text-slate-800 dark:text-slate-100'>
              Description
            </Text>
            <Input value={desc} onChangeText={(text) => setDesc(text)} className='rounded-md  px-6 font-semibold text-sm text-slate-700  dark:text-slate-100 dark:border-slate-200   py-2 border' />
            <TouchableOpacity onPress={addNote}>
              <View className='bg-rose-600 py-3 px-4 rounded-md '>
                <Text className='text-white'>  Add note</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView className='py-10 h-[70%]'>
          {
            notes?.map(({ name, date, desc }, index) =>
              <TouchableOpacity key={index} onPress={() => setOpen({ name, date, desc })}>
                <View className='w-11/12 mx-auto flex items-center justify-between flex-row py-3 px-6 bg-white dark:bg-slate-700 mb-4 rounded-md '>
                  <View>
                    <Text className='text-slate-800 dark:text-slate-100'>
                      {name}
                    </Text>
                    <Text className='text-slate-800 dark:text-slate-100'>
                      {desc}
                    </Text>
                    <Text className='text-slate-400 text-[10px] pt-2'>
                      {date.toLocaleString('em-us', { dateStyle: 'medium' })}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => deleteNote(name)}>
                    <Text className='text-red-500 text-3xl'>  &times;</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )
          }
        </ScrollView>
      </SafeAreaView>

    </View>
  );
}
