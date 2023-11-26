import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import MapFilterButton from './MapFilterButton';
import { HorizontalSpacer } from './Spacers';

interface Props {
    selectedCategories: string[];
    setSelectedCategories: Dispatch<SetStateAction<string[]>>;
}

export default function MapFilterButtonsRow({
    selectedCategories,
    setSelectedCategories,
}: Props) {
    const markerCategories = [
        'faculty',
        'dormitory',
        'club',
        'shop',
        'restaurant',
    ];
    const toggleCategory = useCallback(
        (category: string) => {
            let newCategories = [...selectedCategories];
            if (selectedCategories.includes(category)) {
                newCategories = selectedCategories.filter(
                    item => item !== category,
                );
            } else {
                newCategories.push(category);
            }
            setSelectedCategories(newCategories);
        },
        [selectedCategories, setSelectedCategories],
    );

    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.container}>
            <HorizontalSpacer width={16} />
            {markerCategories.map(category => (
                <MapFilterButton
                    key={category}
                    category={category}
                    isSelected={selectedCategories.includes(category)}
                    toggleCategory={toggleCategory}
                />
            ))}
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingVertical: 2,
        flexDirection: 'row',
    },
});
